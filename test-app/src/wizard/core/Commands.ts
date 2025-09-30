import type { IScopedObserver } from "../../scroped-observer";
import {
  WizardCommands,
  WizardEvents,
  type IBeforeChangeEventPayload,
  type IFailChangeStepEventPayload,
  type ILeaveStepEventPayload,
} from "../types";

class Commands {
  observer: IScopedObserver;
  private SCOPE: string = "wizard:commands";
  constructor(observer: IScopedObserver) {
    this.observer = observer;
  }

  next = () => {
    this.observer.dispatch({
      scope: this.SCOPE,
      eventName: WizardEvents.NAVIGATE,
      payload: WizardCommands.NEXT,
    });
  };

  prev = () => {
    this.observer.dispatch({
      scope: this.SCOPE,
      eventName: WizardEvents.NAVIGATE,
      payload: WizardCommands.PREV,
    });
  };

  beforeChangeStep = (payload: IBeforeChangeEventPayload) => {
    this.observer.dispatch({
      scope: this.SCOPE,
      eventName: WizardEvents.BEFORE_CHANGE_STEP,
      payload,
    });
  };

  changeStep = () => {
    this.observer.dispatch({
      scope: this.SCOPE,
      eventName: WizardEvents.CHANGE_STEP,
    });
  };

  leave = (payload: ILeaveStepEventPayload) => {
    this.observer.dispatch({
      scope: this.SCOPE,
      eventName: WizardEvents.LEAVE_STEP,
      payload,
    });
  };

  failChangeStep = (payload: IFailChangeStepEventPayload) => {
    this.observer.dispatch({
      scope: this.SCOPE,
      eventName: WizardEvents.FAIL_CHANGE_STEP,
      payload,
    });
  };
}

export { Commands };
