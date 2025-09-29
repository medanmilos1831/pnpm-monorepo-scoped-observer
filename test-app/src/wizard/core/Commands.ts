import type { IScopedObserver } from "../../scroped-observer";
import { WizardCommands, type WizardEvent, WizardEvents } from "../types";

class Commands {
  observer: IScopedObserver;
  constructor(observer: IScopedObserver) {
    this.observer = observer;
  }
  nextStepIntercept = () => {
    this.observer.dispatch({
      scope: "wizard:commands",
      eventName: WizardEvents.STEP_INTERCEPT,
      payload: WizardCommands.NEXT,
    });
  };

  nextStepNavigate = () => {
    this.observer.dispatch({
      scope: "wizard:commands",
      eventName: WizardEvents.NAVIGATE,
      payload: WizardCommands.NEXT,
    });
  };

  prevStepIntercept = () => {
    this.observer.dispatch({
      scope: "wizard:commands",
      eventName: WizardEvents.STEP_INTERCEPT,
      payload: WizardCommands.PREV,
    });
  };

  prevStepNavigate = () => {
    this.observer.dispatch({
      scope: "wizard:commands",
      eventName: WizardEvents.NAVIGATE,
      payload: WizardCommands.PREV,
    });
  };
}

export { Commands };
