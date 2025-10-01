import { Wizard } from "./core";
import type { IWizardConfig, IWizardStepsConfig } from "./types";

const createWizard = (
  config: IWizardConfig,
  wizardStepsConfig: IWizardStepsConfig
) => {
  const wizard = new Wizard(config, wizardStepsConfig);

  return {
    next: wizard.events.next,
    prev: wizard.events.prev,
    subscribe: wizard.observer.subscribe,
    getActiveStep: () => wizard.currentStep,
    getStepEntity: () => wizard.stepsMap[wizard.currentStep],
    getActiveSteps: () => wizard.wizardStepsConfig.activeSteps,
  };
};

export { createWizard };
