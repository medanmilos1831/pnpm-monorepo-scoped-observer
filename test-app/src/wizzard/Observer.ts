import {
  createScopedObserver,
  type IScopedObserver,
} from "../scroped-observer";
import { WIZARD_EVENTS, WIZARD_SCOPE, type WizardCommand } from "./constants";

class Observer {
  private observer: IScopedObserver = createScopedObserver([
    {
      scope: WIZARD_SCOPE,
      subScopes: [],
      log: false,
    },
  ]);
  subscribeActiveStepSyncStore = (notify: () => void) => {
    return this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_CHANGED,
      callback: () => {
        notify();
      },
    });
  };

  subscribeStepChanging = (cb: (payload: any) => void) => {
    this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_CHANGING,
      callback: ({ payload }: any) => {
        cb(payload);

        this.observer.dispatch({
          scope: WIZARD_SCOPE,
          eventName: WIZARD_EVENTS.STEP_CHANGED,
          payload: {
            stepName: payload.stepName,
          },
        });
      },
    });
  };

  subscribeStepParamsSyncStore = (cb: any) => {
    return (notify: () => void) =>
      this.observer.subscribe({
        scope: WIZARD_SCOPE,
        eventName: WIZARD_EVENTS.STEP_PARAMS_CHANGED,
        callback: ({
          payload,
        }: {
          payload: { isCompleted: boolean; isChanged: boolean; state: any };
        }) => {
          cb(payload);
          notify();
        },
      });
  };

  subscribeStepRejected = (cb: any) => {
    return (notify: () => void) =>
      this.observer.subscribe({
        scope: WIZARD_SCOPE,
        eventName: WIZARD_EVENTS.STEP_REJECTED,
        callback: ({ payload }: any) => {
          cb(payload);
          notify();
        },
      });
  };

  dispatch = ({ eventName, payload }: { eventName: string; payload: any }) => {
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName,
      payload,
    });
  };

  resolveDispatch(obj: { stepName: string; command: WizardCommand }) {
    return () => {
      this.dispatch({
        eventName: WIZARD_EVENTS.STEP_CHANGING,
        payload: obj,
      });
    };
  }
  rejectDispatch(obj?: { payload?: any }) {
    console.log("rejectDispatch", obj);
    return () => {
      this.dispatch({
        eventName: WIZARD_EVENTS.STEP_REJECTED,
        payload: obj,
      });
    };
  }
}

export { Observer };
