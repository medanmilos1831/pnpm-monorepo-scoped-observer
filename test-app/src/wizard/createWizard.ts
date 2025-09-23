import { Observer } from "./Observer";
import { Wizard } from "./Wizard";
import type { WizardOptions, WizardRoute } from "./types";

const createWizard = (config: WizardRoute[], opts: WizardOptions) => {
  const observer = new Observer();
  const wizard = new Wizard(config, opts, observer.events);

  return {
    activeStepSyncStore: observer.subscribers.activeStepSyncStore,
    stepParamsSyncStore: observer.subscribers.stepParamsSyncStore,
    rejectSubscription: observer.subscribers.rejectSubscription,
    getActiveStepSnapshot: () => wizard.activeStep,
    getStepParamsSnapshot: () => wizard.stepsMap[wizard.activeStep],
    mutateStep: wizard.mutateStep,
    nextStep: wizard.nextStep,
    prevStep: wizard.prevStep,
  };
};

export { createWizard };
