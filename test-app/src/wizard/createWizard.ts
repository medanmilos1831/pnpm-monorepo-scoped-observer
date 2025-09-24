import { Wizard } from "./core";
import { type WizardOptions, type WizardRoute } from "./types";

const createWizard = (config: WizardRoute[], opts: WizardOptions) => {
  const wizard = new Wizard(config, opts);

  return {
    getActiveStep: () => wizard.activeStep,
    getIsStepComplete: () => wizard.stepsMap[wizard.activeStep!].isCompleted,
    getIsStepChanged: () => wizard.stepsMap[wizard.activeStep!].isChanged,
    getStepState: () => wizard.stepsMap[wizard.activeStep!].state,
    getIsLast: () => wizard.isLast,
    getIsFirst: () => wizard.isFirst,
    mutateStep: wizard.mutateStep,
    nextStep: wizard.nextStep,
    prevStep: wizard.prevStep,
    getState: wizard.getState,
    subscribe: wizard.observer.subscribe,
  };
};

export { createWizard };
