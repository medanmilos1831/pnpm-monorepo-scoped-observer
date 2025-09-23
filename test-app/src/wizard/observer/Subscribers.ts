import { type IScopedObserver } from "../../scroped-observer";
import { WIZARD_EVENTS, WIZARD_SCOPE } from "../types";

class Subscribers {
  private observer: IScopedObserver;

  constructor(observer: IScopedObserver) {
    this.observer = observer;
  }

  public activeStepSyncStore = (notify: () => void) => {
    return this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_CHANGED,
      callback: () => {
        notify();
      },
    });
  };

  public stepParamsSyncStore = (notify: () => void) => {
    return this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_PARAMS_CHANGED,
      callback: () => {
        notify();
      },
    });
  };

  public rejectSubscription = (cb: (payload: any) => void) =>
    this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_REJECTED,
      callback: ({ payload }: any) => {
        cb(payload);
      },
    });

  public navigationRequested = (
    callback: ({ payload }: { payload: { command: any } }) => void
  ) => {
    return this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.NAVIGATION_REQUESTED,
      callback,
    });
  };
}

export { Subscribers };
