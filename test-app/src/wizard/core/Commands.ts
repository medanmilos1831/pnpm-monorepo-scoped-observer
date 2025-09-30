import type { IScopedObserver } from "../../scroped-observer";
import { WizardCommands, WizardEvents } from "../types";

class Commands {
  observer: IScopedObserver;
  constructor(observer: IScopedObserver) {
    this.observer = observer;
  }

  next = () => {
    this.observer.dispatch({
      scope: "wizard:commands",
      eventName: WizardEvents.NAVIGATE,
      payload: WizardCommands.NEXT,
    });
  };

  prev = () => {
    this.observer.dispatch({
      scope: "wizard:commands",
      eventName: WizardEvents.NAVIGATE,
      payload: WizardCommands.PREV,
    });
  };
}

export { Commands };
