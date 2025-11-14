interface IObserver {
  dispatch: ({
    scope,
    eventName,
    payload,
  }: {
    scope?: string;
    eventName: string;
    payload?: any;
  }) => void;
  subscribe: ({
    scope,
    eventName,
    callback,
  }: {
    scope?: string;
    eventName: string;
    callback: (payload: any) => void;
  }) => void;
}

type InterceptorCallback = (params: {
  eventName: string;
  payload?: any;
}) => { eventName: string; payload?: any } | null | false;

const createMessageBroker = (observer: IObserver, scope?: string) => {
  const publishInterceptors = new Map<string, InterceptorCallback>();
  const subscribeInterceptors = new Map<string, InterceptorCallback>();

  return {
    interceptor({
      eventName,
      onPublish,
      onSubscribe,
    }: {
      eventName: string;
      onPublish?: InterceptorCallback;
      onSubscribe?: InterceptorCallback;
    }) {
      if (onPublish) {
        publishInterceptors.set(eventName, onPublish);
      }
      if (onSubscribe) {
        subscribeInterceptors.set(eventName, onSubscribe);
      }
    },
    publish({ eventName, payload }: { eventName: string; payload?: any }) {
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
    subscribe({
      eventName,
      callback,
    }: {
      eventName: string;
      callback: (payload: any) => void;
    }) {
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
