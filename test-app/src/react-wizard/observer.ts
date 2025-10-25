import { createScopedObserver } from "@scoped-observer/core";
const createObserver = (scope: string) => {
  const observer = createScopedObserver([
    {
      scope,
    },
  ]);
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
};

export { createObserver };
