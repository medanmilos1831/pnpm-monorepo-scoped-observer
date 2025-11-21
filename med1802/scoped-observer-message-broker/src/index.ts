import type {
  scopedObserverType,
  scopedObserverDispatchType,
  scopedObserverSubscribeType,
} from "@med1802/scoped-observer";

type PublishInterceptor = (params: {
  eventName: string;
  payload?: any;
}) => { eventName: string; payload?: any } | null | false;

type SubscribeInterceptor = (params: {
  eventName: string;
}) => { eventName: string } | null | false;

const createMessageBroker = (observer: scopedObserverType) => {
  const publishInterceptors = new Map<string, PublishInterceptor[]>();
  const subscribeInterceptors = new Map<string, SubscribeInterceptor>();

  return {
    interceptor({
      eventName,
      onPublish,
      onSubscribe,
    }: {
      eventName: string;
      onPublish?: PublishInterceptor;
      onSubscribe?: SubscribeInterceptor;
    }) {
      if (onPublish) {
        const existing = publishInterceptors.get(eventName) || [];
        existing.push(onPublish);
        publishInterceptors.set(eventName, existing);
      }
      if (onSubscribe) {
        subscribeInterceptors.set(eventName, onSubscribe);
      }
    },
    publish({ scope, eventName, payload }: scopedObserverDispatchType) {
      let currentEventName = eventName;
      let currentPayload = payload;

      // Prolazimo kroz sve interceptore redom
      const interceptors = publishInterceptors.get(currentEventName) || [];
      for (const interceptor of interceptors) {
        const result = interceptor({
          eventName: currentEventName,
          payload: currentPayload,
        });

        if (result === null || result === false) {
          return;
        }

        currentEventName = result.eventName;
        currentPayload = result.payload;
      }

      // Na kraju šaljemo observer-u
      observer.dispatch({ scope, eventName: currentEventName, payload: currentPayload });
    },
    subscribe({ scope, eventName, callback }: scopedObserverSubscribeType) {
      const interceptor = subscribeInterceptors.get(eventName);
      if (interceptor) {
        const result = interceptor({ eventName });
        if (result === null || result === false) {
          return () => {};
        }
        eventName = result.eventName;
      }
      return observer.subscribe({ scope, eventName, callback });
    },
  };
};

export { createMessageBroker };
