import type { IScopedObserver } from "../../scroped-observer";
import {
  WizardCommands,
  WizardEvents,
  WIZARD_SCOPE,
  type IFailChangeStepEventPayload,
  type IMeta,
  type IOnNextOnPrevEventPayload,
} from "../types";

class Events {
  private observer: IScopedObserver;

  constructor(observer: IScopedObserver) {
    this.observer = observer;
  }

  onFinish = (payload: any) => {
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: WizardEvents.ON_FINISH,
      payload,
    });
  };

  dispatchByCommand = (
    command: WizardCommands,
    payload: IOnNextOnPrevEventPayload
  ) => {
    const eventName =
      command === WizardCommands.NEXT
        ? WizardEvents.ON_NEXT
        : WizardEvents.ON_PREV;

    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName,
      payload,
    });
  };

  changeStep = () => {
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: WizardEvents.CHANGE_STEP,
    });
  };

  failChangeStep = (payload: IFailChangeStepEventPayload) => {
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: WizardEvents.FAIL_CHANGE_STEP,
      payload,
    });
  };

  updateSteps = () => {
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: WizardEvents.ON_UPDATE_STEPS,
    });
  };

  setStatus = () => {
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: WizardEvents.SET_STATUS,
    });
  };
}

export { Events };
