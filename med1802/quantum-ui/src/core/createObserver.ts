import { createScopedObserver } from "@scoped-observer/core";

function createObserver(scope: string) {
  const observer = createScopedObserver([
    {
      scope,
    },
  ]);

  const dispatch = (eventName: string, payload?: any) => {
    observer.dispatch({
      scope,
      eventName,
      payload: payload || undefined,
    });
  };
  const subscribe = (eventName: string, callback: (payload: any) => void) => {
    return observer.subscribe({
      scope,
      eventName,
      callback,
    });
  };

  return {
    scope,
    dispatch,
    subscribe,
  };
}

export { createObserver };
