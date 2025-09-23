import { WIZARD_EVENTS, WIZARD_SCOPE } from "./constants";
import type { IScopedObserver } from "../scroped-observer";

class Subscribers {
  constructor(private observer: IScopedObserver) {}

  activeStepSyncStore = (notify: () => void) => {
    return this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_CHANGED,
      callback: () => {
        notify();
      },
    });
  };

  stepParamsSyncStore = (notify: () => void) => {
    return this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_PARAMS_CHANGED,
      callback: () => {
        notify();
      },
    });
  };

  rejectSubscription = (cb: (payload: any) => void) =>
    this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_REJECTED,
      callback: ({ payload }: any) => {
        cb(payload);
      },
    });
}

export { Subscribers };
