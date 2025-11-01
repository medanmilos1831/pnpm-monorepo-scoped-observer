import { type IWizardConfig } from "../../types";
import { createWizardModules } from "./createWizardModules";
import { createWizardState } from "./createWizardState";
const createEntity = (props: IWizardConfig) => {
  const stateManager = createWizardState(props);
  const modules = createWizardModules(stateManager);
  return {
    stateManager,
    modules,
  };
};

export { createEntity };
