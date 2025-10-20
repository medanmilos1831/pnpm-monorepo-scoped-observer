import { createScopedObserver } from "@scoped-observer/core";
import { SCROLLIUM_SCOPE } from "../../types";

class Observer {
  private observer = createScopedObserver([
    {
      scope: SCROLLIUM_SCOPE,
    },
  ]);

  dispatch = (eventName: string, payload?: any) => {
    this.observer.dispatch({
      scope: SCROLLIUM_SCOPE,
      eventName,
      payload: payload || undefined,
    });
  };

  subscribe = (eventName: string, callback: (payload: any) => void) => {
    return this.observer.subscribe({
      scope: SCROLLIUM_SCOPE,
      eventName,
      callback,
    });
  };
}

export { Observer };
