import { type IScopedObserver } from "../scroped-observer";
import { WIZARD_COMMANDS, WIZARD_EVENTS, WIZARD_SCOPE } from "./constants";

class Events {
  private observer: IScopedObserver;

  constructor(observer: IScopedObserver) {
    this.observer = observer;
  }

  private nextStep = () => {
    this.dispatch({
      event: WIZARD_EVENTS.NAVIGATION_REQUESTED,
      payload: {
        command: WIZARD_COMMANDS.NEXT,
      },
    });
  };

  private prevStep = () => {
    this.dispatch({
      event: WIZARD_EVENTS.NAVIGATION_REQUESTED,
      payload: {
        command: WIZARD_COMMANDS.PREV,
      },
    });
  };

  private stepChanged = (stepName: string) => {
    this.dispatch({
      event: WIZARD_EVENTS.STEP_CHANGED,
      payload: {
        stepName,
      },
    });
  };

  private stepRejected = (error?: any) => {
    this.dispatch({
      event: WIZARD_EVENTS.STEP_REJECTED,
      payload: error,
    });
  };

  private stepParamsChanged = () => {
    this.dispatch({
      event: WIZARD_EVENTS.STEP_PARAMS_CHANGED,
    });
  };

  // Generic event dispatcher
  public dispatch = ({ event, payload }: { event: string; payload?: any }) => {
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: event,
      payload,
    });
  };
}

export { Events };
