import { createScopedObserver } from "../../../../scroped-observer";

class Observer {
  private observer = createScopedObserver([
    {
      scope: "wizard",
    },
  ]);

  dispatch = (eventName: string, payload?: any) => {
    this.observer.dispatch({
      scope: "wizard",
      eventName,
      payload: payload || undefined,
    });
  };

  subscribe = (eventName: string, callback: (payload: any) => void) => {
    return this.observer.subscribe({
      scope: "wizard",
      eventName,
      callback,
    });
  };
}

export { Observer };
