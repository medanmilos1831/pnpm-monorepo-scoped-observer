import { Wizard } from "./core";
import { Client } from "./core/Client";
import type { IWizardConfig, IWizardStepsConfig } from "./types";

const createWizardClient = (
  config: IWizardConfig,
  wizardStepsConfig: IWizardStepsConfig,
  name: string
) => {
  return new Client(new Wizard(config, wizardStepsConfig, name));
};

export { createWizardClient };
