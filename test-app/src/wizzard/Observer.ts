import {
  createScopedObserver,
  type IScopedObserver,
} from "../scroped-observer";
import { WIZARD_EVENTS, WIZARD_SCOPE, type WizardCommand } from "./constants";

class Observer {
  observer: IScopedObserver = createScopedObserver([
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

  /**
   * Subscribe to navigation requests from Client
   * @param callback - Function to call when navigation is requested
   * @returns Unsubscribe function
   */
  subscribeNavigation(callback: (payload: { command: WizardCommand }) => void) {
    return this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.NAVIGATION_REQUESTED,
      callback: ({ payload }) => {
        callback(payload);
      },
    });
  }
}

export { Observer };
