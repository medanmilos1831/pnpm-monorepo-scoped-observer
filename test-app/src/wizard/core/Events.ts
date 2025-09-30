import type { IScopedObserver } from "../../scroped-observer";
import {
  WizardCommands,
  WizardEvents,
  WizardScopes,
  type IBeforeChangeEventPayload,
  type IFailChangeStepEventPayload,
  type ILeaveStepEventPayload,
} from "../types";

class Events {
  observer: IScopedObserver;
  constructor(observer: IScopedObserver) {
    this.observer = observer;
  }

  next = (params?: { force: boolean }) => {
    const force = params?.force ?? false;

    this.observer.dispatch({
      scope: WizardScopes.COMMANDS,
      eventName: WizardEvents.NAVIGATE,
      payload: {
        command: WizardCommands.NEXT,
        force,
      },
    });
  };

  prev = () => {
    this.observer.dispatch({
      scope: WizardScopes.COMMANDS,
      eventName: WizardEvents.NAVIGATE,
      payload: {
        command: WizardCommands.PREV,
        force: false,
      },
    });
  };

  beforeChangeStep = (payload: IBeforeChangeEventPayload) => {
    this.observer.dispatch({
      scope: WizardScopes.COMMANDS,
      eventName: WizardEvents.BEFORE_CHANGE_STEP,
      payload,
    });
  };

  changeStep = () => {
    this.observer.dispatch({
      scope: WizardScopes.COMMANDS,
      eventName: WizardEvents.CHANGE_STEP,
    });
  };

  leave = (payload: ILeaveStepEventPayload) => {
    this.observer.dispatch({
      scope: WizardScopes.COMMANDS,
      eventName: WizardEvents.LEAVE_STEP,
      payload,
    });
  };

  failChangeStep = (payload: IFailChangeStepEventPayload) => {
    this.observer.dispatch({
      scope: WizardScopes.COMMANDS,
      eventName: WizardEvents.FAIL_CHANGE_STEP,
      payload,
    });
  };
}

export { Events };
