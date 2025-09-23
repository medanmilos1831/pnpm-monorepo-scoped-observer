import type { IScopedObserver } from "../scroped-observer";
import { WIZARD_COMMANDS, WIZARD_EVENTS, WIZARD_SCOPE } from "./constants";

class Commands {
  nextStep: any;
  prevStep: any;
  constructor(private observer: IScopedObserver) {
    this.nextStep = () => {
      observer.dispatch({
        scope: WIZARD_SCOPE,
        eventName: WIZARD_EVENTS.NAVIGATION_REQUESTED,
        payload: {
          command: WIZARD_COMMANDS.NEXT,
        },
      });
    };
    this.prevStep = () => {
      observer.dispatch({
        scope: WIZARD_SCOPE,
        eventName: WIZARD_EVENTS.NAVIGATION_REQUESTED,
        payload: {
          command: WIZARD_COMMANDS.PREV,
        },
      });
    };
  }
}

export { Commands };
