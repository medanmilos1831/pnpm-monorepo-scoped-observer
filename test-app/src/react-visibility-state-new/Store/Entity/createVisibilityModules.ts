import { createModuleInstance } from "../../core/createModuleInstance";

import type { createObserver } from "../../core/observer";
import type { createVisibilityState } from "./createVisibilityState";

const createVisibilityModules = (props: {
  stateManager: ReturnType<typeof createVisibilityState>;
  observer: ReturnType<typeof createObserver>;
}) => {
  return createModuleInstance(props, {
    commands(value) {
      return {};
    },
  });
};

export { createVisibilityModules };
