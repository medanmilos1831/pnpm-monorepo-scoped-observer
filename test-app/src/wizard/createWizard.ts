import { Wizard } from "./core";
import type { IWizardConfig, IWizardStepsConfig } from "./types";

const createWizard = (
  config: IWizardConfig,
  wizardStepsConfig: IWizardStepsConfig
) => {
  const wizard = new Wizard(config, wizardStepsConfig);

  return {
    next: wizard.next,
    prev: wizard.prev,
    reset: wizard.reset,
    navigateToStep: wizard.navigateToStep,
    subscribe: wizard.observer.subscribe,
    interceptor: wizard.observer.eventInterceptor,
    getActiveStep: () => wizard.currentStep,
    getIsLast: () => wizard.isLast,
    getIsFirst: () => wizard.isFirst,
    getActiveSteps: () => wizard.wizardStepsConfig.activeSteps,
    getStatus: () => wizard.status,
  };
};

export { createWizard };
