import { type IWizardConfig } from "../../types";
import { createEntityApiClient } from "./createEntityApiClient";

import { createWizardModules } from "./createWizardModules";
import { createWizardState } from "./createWizardState";
const createEntity = (props: IWizardConfig) => {
  const stateManager = createWizardState(props);
  const modules = createWizardModules(stateManager);
  const obj = {
    stateManager,
    modules,
  };
  return createEntityApiClient(obj);
};

export { createEntity };
