import { Wizard } from "./Wizard";
import type { IWizardConfig } from "./types";

const createWizzard = (config: IWizardConfig) => {
  // let e = new Wizard(config);
  return new Wizard(config);
};

export { createWizzard };
