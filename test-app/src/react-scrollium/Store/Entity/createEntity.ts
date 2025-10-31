import { type ScrolliumProps } from "../../types";
import { createScrolliumModules } from "./createScrolliumModules";
import { createScrolliumState } from "./createScrolliumState";
const createEntity = (props: ScrolliumProps) => {
  const stateManager = createScrolliumState(props);
  const modules = createScrolliumModules(stateManager);
  return {
    stateManager,
    modules,
  };
};

export { createEntity };
