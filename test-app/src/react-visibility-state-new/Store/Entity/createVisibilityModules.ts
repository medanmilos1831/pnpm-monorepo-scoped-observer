import { createModuleInstance } from "../../core/createModuleInstance";

import type { createObserver } from "../../core/observer";
import {
  INITIAL_STATE,
  VisibilityPublicEvents,
  type initialStateType,
} from "../../types";
import type { createVisibilityState } from "./createVisibilityState";

const createVisibilityModules = (props: {
  stateManager: ReturnType<typeof createVisibilityState>;
  observer: ReturnType<typeof createObserver>;
}) => {
  function dispatchVisibilityChange(value: initialStateType) {
    props.observer.dispatch(VisibilityPublicEvents.ON_VISIBILITY_CHANGE, {
      payload: {
        visibility: value,
      },
    });
  }
  return createModuleInstance(props, {
    commands(value) {
      const { stateManager } = value;
      return {
        on: () => {
          stateManager.mutations.setVisibility(INITIAL_STATE.ON);
          dispatchVisibilityChange(INITIAL_STATE.ON);
        },
        off: () => {
          stateManager.mutations.setVisibility(INITIAL_STATE.OFF);
          dispatchVisibilityChange(INITIAL_STATE.OFF);
        },
        toggle: () => {
          const value =
            stateManager.getters.getVisibility() === INITIAL_STATE.ON
              ? INITIAL_STATE.OFF
              : INITIAL_STATE.ON;
          stateManager.mutations.setVisibility(value);
          dispatchVisibilityChange(value);
        },
      };
    },
  });
};

export { createVisibilityModules };
