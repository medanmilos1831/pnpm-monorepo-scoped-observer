import { Wizard } from "./core";
import { Client } from "./core/Client";
import type { IWizardConfig, IWizardStepsConfig } from "./types";

const createWizard = (
  config: IWizardConfig,
  wizardStepsConfig: IWizardStepsConfig
) => {
  return new Client(new Wizard(config, wizardStepsConfig));
};

export { createWizard };
