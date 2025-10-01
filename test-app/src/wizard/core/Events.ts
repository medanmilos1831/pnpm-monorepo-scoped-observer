import type { IScopedObserver } from "../../scroped-observer";
import {
  WizardCommands,
  WizardEvents,
  WizardScopes,
  type IBeforeChangeEventPayload,
  type IFailChangeStepEventPayload,
  type IMeta,
} from "../types";

class Events {
  observer: IScopedObserver;
  constructor(observer: IScopedObserver) {
    this.observer = observer;
  }

  next = (params?: IMeta) => {
    this.observer.dispatch({
      scope: WizardScopes.COMMANDS,
      eventName: WizardEvents.NAVIGATE,
      payload: {
        command: WizardCommands.NEXT,
        actionMeta: params || {
          actionType: "default",
        },
      },
    });
  };

  prev = (params?: IMeta) => {
    this.observer.dispatch({
      scope: WizardScopes.COMMANDS,
      eventName: WizardEvents.NAVIGATE,
      payload: {
        command: WizardCommands.PREV,
        actionMeta: params || {
          actionType: "default",
        },
      },
    });
  };

  onFinish = (payload: any) => {
    this.observer.dispatch({
      scope: WizardScopes.COMMANDS,
      eventName: WizardEvents.ON_FINISH,
      payload,
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

  failChangeStep = (payload: IFailChangeStepEventPayload) => {
    this.observer.dispatch({
      scope: WizardScopes.COMMANDS,
      eventName: WizardEvents.FAIL_CHANGE_STEP,
      payload,
    });
  };

  updateSteps = () => {
    this.observer.dispatch({
      scope: WizardScopes.COMMANDS,
      eventName: WizardEvents.ON_UPDATE_STEPS,
    });
  };

  reset = () => {
    this.observer.dispatch({
      scope: WizardScopes.COMMANDS,
      eventName: WizardEvents.RESET,
    });
  };
}

export { Events };
