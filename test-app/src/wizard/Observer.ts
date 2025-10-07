import {
  type IScopedObserver,
  createScopedObserver,
} from "../scroped-observer";
import { WIZARD_SCOPE } from "./types";

class Observer {
  private observer: IScopedObserver = createScopedObserver([
    {
      scope: WIZARD_SCOPE,
    },
  ]);

  dispatch = ({ eventName, payload }: { eventName: string; payload?: any }) => {
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName,
      payload,
    });
  };
  subscribe = ({
    eventName,
    callback,
  }: {
    eventName: string;
    callback: (payload: any) => void;
  }) => {
    return this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName,
      callback,
    });
  };
  eventInterceptor = this.observer.eventInterceptor;
}

export { Observer };
