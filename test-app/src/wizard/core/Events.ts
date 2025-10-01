import type { IScopedObserver } from "../../scroped-observer";
import {
  WizardCommands,
  WizardEvents,
  WizardScopes,
  type IBeforeChangeEventPayload,
  type IFailChangeStepEventPayload,
} from "../types";

class Events {
  observer: IScopedObserver;
  constructor(observer: IScopedObserver) {
    this.observer = observer;
  }

  next = (params?: { actionType: string }) => {
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

  prev = (params?: { actionType: string }) => {
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
}

export { Events };
