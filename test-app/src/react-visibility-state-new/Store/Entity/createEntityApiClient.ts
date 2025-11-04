import { createModuleInstance } from "../../core/createModuleInstance";
import { createObserver } from "../../core/observer";
import { ENTITY_OBSERVER, type VisibilityProps } from "../../types";
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
      // function getClient() {
      //   return {};
      // }
      // const addEventListener = (
      //   event: `${ScrolliumPublicEventsType}`,
      //   callback: (payload: any) => void
      // ) => {
      //   return value.observer.subscribe(event, () => {
      //     callback(getClient());
      //   });
      // };

      return {
        getCommands: () => value.modules.commands,
      };
    },
  });
};

export { createEntityApiClient };
