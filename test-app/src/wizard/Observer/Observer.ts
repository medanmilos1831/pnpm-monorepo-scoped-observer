import { createScopedObserver } from "../../scroped-observer";
import { SCOPE_NAME } from "./types";

class Observer {
  private observer = createScopedObserver([
    {
      scope: SCOPE_NAME,
    },
  ]);

  dispatch = (eventName: string, payload?: any) => {
    this.observer.dispatch({
      scope: SCOPE_NAME,
      eventName,
      payload: payload || undefined,
    });
  };

  subscribe = (eventName: string, callback: (payload: any) => void) => {
    return this.observer.subscribe({
      scope: SCOPE_NAME,
      eventName,
      callback,
    });
  };
}

export { Observer };
