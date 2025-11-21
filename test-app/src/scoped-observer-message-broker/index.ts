import type {
  scopedObserverType,
  scopedObserverDispatchType,
  scopedObserverSubscribeType,
} from "../scoped-observer";

type PublishInterceptor = (params: {
  eventName: string;
  payload?: any;
}) => { eventName: string; payload?: any } | null | false;

type SubscribeInterceptor = (params: {
  eventName: string;
}) => { eventName: string } | null | false;

const createMessageBroker = (observer: scopedObserverType) => {
  const publishInterceptors = new Map<string, PublishInterceptor>();
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
        publishInterceptors.set(eventName, onPublish);
      }
      if (onSubscribe) {
        subscribeInterceptors.set(eventName, onSubscribe);
      }
    },
    publish({ scope, eventName, payload }: scopedObserverDispatchType) {
      const interceptor = publishInterceptors.get(eventName);
      if (interceptor) {
        const result = interceptor({ eventName, payload });
        if (result === null || result === false) {
          return;
        }
        eventName = result.eventName;
        payload = result.payload;
      }
      observer.dispatch({ scope, eventName, payload });
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
