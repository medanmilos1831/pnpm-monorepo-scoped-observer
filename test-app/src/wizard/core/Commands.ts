import type { IScopedObserver } from "../../scroped-observer";
import { WizardCommands } from "../types";

class Commands {
  observer: IScopedObserver;
  constructor(observer: IScopedObserver) {
    this.observer = observer;
  }
  nextStep = () => {
    this.observer.dispatch({
      scope: "wizard:commands",
      eventName: "navigate",
      payload: WizardCommands.NEXT,
    });
  };
  prevStep = () => {
    this.observer.dispatch({
      scope: "wizard:commands",
      eventName: "navigate",
      payload: WizardCommands.PREV,
    });
  };
}

export { Commands };
