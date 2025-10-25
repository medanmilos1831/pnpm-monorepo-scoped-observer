import { createScopedObserver } from "@scoped-observer/core";
import { WIZARD_OBSERVER_SCOPE } from "../types";
const createObserver = () => {
  const observer = createScopedObserver([
    {
      scope: WIZARD_OBSERVER_SCOPE,
    },
  ]);
  return {
    dispatch: (eventName: string, payload?: any) => {
      observer.dispatch({
        scope: WIZARD_OBSERVER_SCOPE,
        eventName,
        payload: payload || undefined,
      });
    },
    subscribe: (eventName: string, callback: (payload: any) => void) => {
      return observer.subscribe({
        scope: WIZARD_OBSERVER_SCOPE,
        eventName,
        callback,
      });
    },
  };
};

export { createObserver };
