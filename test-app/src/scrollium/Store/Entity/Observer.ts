import { createScopedObserver } from "@scoped-observer/core";

class Observer {
  private observer = createScopedObserver([
    {
      scope: "scroll",
    },
  ]);

  dispatch = (eventName: string, payload?: any) => {
    this.observer.dispatch({
      scope: "scroll",
      eventName,
      payload: payload || undefined,
    });
  };

  subscribe = (eventName: string, callback: (payload: any) => void) => {
    return this.observer.subscribe({
      scope: "scroll",
      eventName,
      callback,
    });
  };
}

export { Observer };
