import { Wizard } from "./Wizard";
import type { IWizardConfig } from "./types";

const createWizzard = (config: IWizardConfig) => {
  return new Wizard(config);
};

export { createWizzard };
