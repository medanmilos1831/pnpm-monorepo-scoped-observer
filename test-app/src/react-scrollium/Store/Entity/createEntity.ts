import { type ScrolliumProps } from "../../types";
import { createModules } from "./createModules";
import { createStateManager } from "./createStateManager";
const createEntity = (props: ScrolliumProps) => {
  const stateManager = createStateManager(props);
  const modules = createModules(stateManager);
  return {
    stateManager,
    modules,
    // addEventListener(
    //   event: `${ScrolliumPublicEventsType}`,
    //   callback: (payload: any) => void
    // ) {
    //   return stateManager.observer.subscribe(event, ({ payload }) => {
    //     callback(payload);
    //   });
    // },
  };
};

export { createEntity };
