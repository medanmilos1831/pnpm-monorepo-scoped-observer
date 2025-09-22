import type { IScopedObserver } from "../scroped-observer";
import { WIZARD_COMMANDS, WIZARD_EVENTS, WIZARD_SCOPE } from "./constants";
import { Observer } from "./Observer";
import { Wizard } from "./Wizard";

class Client {
  private observer: IScopedObserver;
  activeStepSyncStore = {};
  stepParamsSyncStore = {};
  constructor(observer: Observer) {
    this.observer = observer.observer;
    // this.wizard = wizard;
    this.activeStepSyncStore = {
      subscribe: this.activeStepSyncStore,
      getSnapshot: this.activeStepSyncStore,
    };
    // this.stepParamsSyncStore = {
    //   subscribe: this.wizard.stepParamsSyncStore.subscribe,
    //   getSnapshot: this.wizard.stepParamsSyncStore.getSnapshot,
    // };
  }

  nextStep = () => {
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.NAVIGATION_REQUESTED,
      payload: {
        command: WIZARD_COMMANDS.NEXT,
      },
    });
  };

  prevStep = () => {
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.NAVIGATION_REQUESTED,
      payload: {
        command: WIZARD_COMMANDS.PREV,
      },
    });
  };
}

export { Client };
