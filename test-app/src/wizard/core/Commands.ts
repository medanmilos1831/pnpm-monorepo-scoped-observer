import type { IScopedObserver } from "../../scroped-observer";
import { WizardCommands, type WizardEvent, WizardEvents } from "../types";

class Commands {
  observer: IScopedObserver;
  constructor(observer: IScopedObserver) {
    this.observer = observer;
  }
  nextStep = (obj: {
    event: typeof WizardEvents.STEP_INTERCEPT | typeof WizardEvents.NAVIGATE;
  }) => {
    this.observer.dispatch({
      scope: "wizard:commands",
      eventName: obj.event,
      payload: WizardCommands.NEXT,
    });
  };
  prevStep = (obj: {
    event: typeof WizardEvents.STEP_INTERCEPT | typeof WizardEvents.NAVIGATE;
  }) => {
    this.observer.dispatch({
      scope: "wizard:commands",
      eventName: obj.event,
      payload: WizardCommands.PREV,
    });
  };
}

export { Commands };
