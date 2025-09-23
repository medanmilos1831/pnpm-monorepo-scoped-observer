import { Observer } from "./observer";
import { Wizard } from "./core";
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
    isLast: () => wizard.isLast,
    isFirst: () => wizard.isFirst,
  };
};

export { createWizard };
