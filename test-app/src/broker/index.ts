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
      scope,
      eventName,
      onPublish,
      onSubscribe,
    }: {
      scope?: string;
      eventName: string;
      onPublish?: PublishInterceptor;
      onSubscribe?: SubscribeInterceptor;
    }) {
      const key = scope ? `${scope}:${eventName}` : eventName;

      if (onPublish) {
        const existing = publishInterceptors.get(key) || [];
        existing.push(onPublish);
        publishInterceptors.set(key, existing);
      }
      if (onSubscribe) {
        subscribeInterceptors.set(key, onSubscribe);
      }
    },
    publish({ scope, eventName, payload }: scopedObserverDispatchType) {
      let currentEventName = eventName;
      let currentPayload = payload;

      // Try scope-specific interceptor first, then global
      const scopeKey = scope ? `${scope}:${currentEventName}` : undefined;
      const interceptors = scopeKey
        ? publishInterceptors.get(scopeKey) ||
          publishInterceptors.get(currentEventName) ||
          []
        : publishInterceptors.get(currentEventName) || [];

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

      observer.dispatch({
        scope,
        eventName: currentEventName,
        payload: currentPayload,
      });
    },
    subscribe({ scope, eventName, callback }: scopedObserverSubscribeType) {
      // Try scope-specific interceptor first, then global
      const scopeKey = scope ? `${scope}:${eventName}` : undefined;
      const interceptor = scopeKey
        ? subscribeInterceptors.get(scopeKey) ||
          subscribeInterceptors.get(eventName)
        : subscribeInterceptors.get(eventName);

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
