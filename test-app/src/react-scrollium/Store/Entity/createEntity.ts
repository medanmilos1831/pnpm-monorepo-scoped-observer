import { createObserver } from "../../observer";

import { createMount } from "./createMount";
import {
  type IEntity,
  type ScrolliumProps,
  type ScrolliumPublicEventsType,
} from "../../types";
import { createStateManager } from "./createStateManager";
import { createModules } from "./createModules";
const createEntity = (
  props: ScrolliumProps,
  storeObserver: ReturnType<typeof createObserver>,
  entitiesMap: Map<string, IEntity>
) => {
  const stateManager = createStateManager(props);
  const mount = createMount(entitiesMap, props, storeObserver);
  const modules = createModules(stateManager);
  return {
    stateManager,
    modules,
    mount,
    addEventListener(
      event: `${ScrolliumPublicEventsType}`,
      callback: (payload: any) => void
    ) {
      return stateManager.observer.subscribe(event, ({ payload }) => {
        callback(payload);
      });
    },
  };
};

export { createEntity };
