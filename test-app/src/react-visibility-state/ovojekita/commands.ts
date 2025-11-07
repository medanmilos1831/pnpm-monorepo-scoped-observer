import type { framework } from ".";
import {
  INITIAL_STATE,
  VisibilityPublicEvents,
  type initialStateType,
} from "../types";
type StateManager = {
  stateManager: ReturnType<typeof framework.createStateManager>;
  observer: ReturnType<typeof framework.createObserver>;
};
export function commands(value: StateManager) {
  const { stateManager, observer } = value;
  function dispatchVisibilityChange(value: initialStateType) {
    observer.dispatch(VisibilityPublicEvents.ON_VISIBILITY_CHANGE, {
      payload: {
        visibility: value,
      },
    });
  }
  return {
    on: () => {
      stateManager.mutations.setVisibility(INITIAL_STATE.ON);
      dispatchVisibilityChange(INITIAL_STATE.ON);
    },
    off: () => {
      stateManager.mutations.setVisibility(INITIAL_STATE.OFF);
      observer.dispatch(VisibilityPublicEvents.ON_VISIBILITY_CHANGE, {
        payload: {
          visibility: INITIAL_STATE.OFF,
        },
      });
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
}
