import { type IScopedObserver } from "../../scroped-observer";
import { WIZARD_SCOPE } from "../types";

class Events {
  private observer: IScopedObserver;

  constructor(observer: IScopedObserver) {
    this.observer = observer;
  }
  public dispatch = ({ event, payload }: { event: string; payload?: any }) => {
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: event,
      payload,
    });
  };
}

export { Events };
