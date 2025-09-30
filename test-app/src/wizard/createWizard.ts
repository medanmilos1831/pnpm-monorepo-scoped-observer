import { Wizard } from "./core";
import type { IWizardConfig, IWizardStepsConfig } from "./types";

const createWizard = (
  config: IWizardConfig,
  wizardStepsConfig: IWizardStepsConfig
) => {
  const wizard = new Wizard(config, wizardStepsConfig);

  return {
    next: wizard.commands.next,
    prev: wizard.commands.prev,
    subscribe: wizard.observer.subscribe,
    getActiveStep: () => wizard.currentStep,
    getStepEntity: () => wizard.stepsMap[wizard.currentStep],
    getStepEntityByStepName: (stepName: string) => wizard.stepsMap[stepName],
    setStepState: wizard.setStepState,
  };
};

export { createWizard };
