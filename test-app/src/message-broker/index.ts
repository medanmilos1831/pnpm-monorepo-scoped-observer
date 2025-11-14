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

const createMessageBroker = (observer: IObserver, scope: string) => {
  return {
    interceptor() {},
    publish({ eventName, payload }: { eventName: string; payload?: any }) {
      observer.dispatch({ scope, eventName, payload });
    },
    subscribe({
      eventName,
      callback,
    }: {
      eventName: string;
      callback: (payload: any) => void;
    }) {
      return observer.subscribe({ scope, eventName, callback });
    },
  };
};

export { createMessageBroker };
