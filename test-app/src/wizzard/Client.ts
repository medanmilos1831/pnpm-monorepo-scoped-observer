import { WIZARD_COMMANDS } from "./constants";
import { Wizard } from "./Wizard";

class Client {
  private wizard: Wizard;
  activeStepSyncStore = {};
  stepParamsSyncStore = {};
  constructor(wizard: Wizard) {
    this.wizard = wizard;
    this.activeStepSyncStore = {
      subscribe: this.wizard.activeStepSyncStore.subscribe,
      getSnapshot: this.wizard.activeStepSyncStore.getSnapshot,
    };
    this.stepParamsSyncStore = {
      subscribe: this.wizard.stepParamsSyncStore.subscribe,
      getSnapshot: this.wizard.stepParamsSyncStore.getSnapshot,
    };
  }

  nextStep() {
    this.wizard.navigator(WIZARD_COMMANDS.NEXT);
  }

  prevStep() {
    this.wizard.navigator(WIZARD_COMMANDS.PREV);
  }
}

export { Client };
