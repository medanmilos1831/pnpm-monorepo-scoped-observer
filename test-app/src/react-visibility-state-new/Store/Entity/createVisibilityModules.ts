import { createModuleInstance } from "../../core/createModuleInstance";

import type { createObserver } from "../../core/observer";
import { INITIAL_STATE } from "../../types";
import type { createVisibilityState } from "./createVisibilityState";

const createVisibilityModules = (props: {
  stateManager: ReturnType<typeof createVisibilityState>;
  observer: ReturnType<typeof createObserver>;
}) => {
  return createModuleInstance(props, {
    commands(value) {
      return {
        on: () => {
          value.stateManager.mutations.setVisibility(INITIAL_STATE.ON);
        },
        off: () => {
          value.stateManager.mutations.setVisibility(INITIAL_STATE.OFF);
        },
        toggle: () => {
          value.stateManager.mutations.setVisibility(
            value.stateManager.getters.getVisibility() === INITIAL_STATE.ON
              ? INITIAL_STATE.OFF
              : INITIAL_STATE.ON
          );
        },
      };
    },
  });
};

export { createVisibilityModules };
