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
    reset: wizard.reset,
    setStatus: wizard.setStatus,
    subscribe: wizard.observer.subscribe,
    getActiveStep: () => wizard.currentStep,
    getStepEntity: () => wizard.stepsMap[wizard.currentStep],
    getIsLast: () => wizard.isLast,
    getIsFirst: () => wizard.isFirst,
    getActiveSteps: () => wizard.wizardStepsConfig.activeSteps,
    getStatus: () => wizard.status,
  };
};

export { createWizard };
