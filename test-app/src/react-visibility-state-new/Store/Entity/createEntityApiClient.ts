import { createModuleInstance } from "../../core/createModuleInstance";
import { createObserver } from "../../core/observer";
import {
  ENTITY_OBSERVER,
  type VisibilityProps,
  type VisibilityPublicEventsType,
} from "../../types";
import { createVisibilityModules } from "./createVisibilityModules";
import { createVisibilityState } from "./createVisibilityState";

const createEntityApiClient = (props: VisibilityProps) => {
  const stateManager = createVisibilityState(props);
  const observer = createObserver(ENTITY_OBSERVER);
  const modules = createVisibilityModules({
    stateManager: stateManager,
    observer,
  });
  const obj = {
    stateManager,
    modules,
    observer,
  };
  return createModuleInstance(obj, {
    api(value) {
      const state = value.stateManager;
      const getters = state.getters;
      const commands = value.modules.commands;
      const addEventListener = (
        event: `${VisibilityPublicEventsType}`,
        callback: () => void
      ) => {
        return value.observer.subscribe(event, () => {
          callback();
        });
      };

      return {
        getCommands: () => value.modules.commands,
        getters: () => value.stateManager.getters,
        addEventListener,
        getClient: () => {
          return {
            visibility: getters.getVisibility(),
          };
        },
        getClientEntity: () => {
          return {
            addEventListener,
            commands,
            getters,
          };
        },
      };
    },
  });
};

export { createEntityApiClient };
