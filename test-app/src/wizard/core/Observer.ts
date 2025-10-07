import {
  type IScopedObserver,
  createScopedObserver,
} from "../../scroped-observer";
import { WIZARD_SCOPE } from "../types";

class Observer {
  private observer: IScopedObserver = createScopedObserver([
    {
      scope: WIZARD_SCOPE,
    },
  ]);

  dispatch = ({ eventName, payload }: { eventName: string; payload?: any }) => {
    return this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName,
      payload,
    });
  };
  subscribe = this.observer.subscribe;
  eventInterceptor = this.observer.eventInterceptor;
}

export { Observer };
