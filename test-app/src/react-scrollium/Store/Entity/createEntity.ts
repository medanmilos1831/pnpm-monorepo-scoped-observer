import { type ScrolliumProps } from "../../types";
import { createModules } from "./createModules";
import { createStateManager } from "./createStateManager";
const createEntity = (props: ScrolliumProps) => {
  const stateManager = createStateManager(props);
  const modules = createModules(stateManager);
  return {
    stateManager,
    modules,
  };
};

export { createEntity };
