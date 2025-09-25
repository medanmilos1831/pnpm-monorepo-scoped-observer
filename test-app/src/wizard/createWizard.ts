import { Wizard } from "./core";
import type { IWizardConfig, IWizardStepsConfig } from "./types";

const createWizard = (
  config: IWizardConfig,
  wizardStepsConfig: IWizardStepsConfig
) => {
  const wizard = new Wizard(config, wizardStepsConfig);

  return {
    nextStep: wizard.commands.nextStep,
    prevStep: wizard.commands.prevStep,
    subscribe: wizard.observer.subscribe,
    getActiveStep: () => wizard.currentStep,
  };
};

export { createWizard };
