import { Wizard } from "./core";
import type { IWizardConfig } from "./types";

const createWizard = (config: IWizardConfig) => {
  const wizard = new Wizard(config);

  return {
    nextStep: wizard.commands.nextStep,
    prevStep: wizard.commands.prevStep,
    subscribe: wizard.observer.subscribe,
  };
};

export { createWizard };
