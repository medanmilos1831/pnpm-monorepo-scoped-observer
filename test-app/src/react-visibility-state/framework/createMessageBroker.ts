import type { createObserver } from "./createObserver";

function createMessageBroker({
  scope,
  observer,
}: ReturnType<typeof createObserver>) {
  return {
    dispatch: (eventName: string, payload?: any) => {
      observer.dispatch({
        scope,
        eventName,
        payload: payload || undefined,
      });
    },
    subscribe: (eventName: string, callback: (payload: any) => void) => {
      return observer.subscribe({
        scope,
        eventName,
        callback,
      });
    },
  };
}

export { createMessageBroker };
