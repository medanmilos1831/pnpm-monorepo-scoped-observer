import { createObserver } from "../../observer";

import { createMount } from "./createMount";
import { createStateManager } from "./StateManager/createStateManager";
import { SCROLLIUM_SCOPE, type ScrolliumProps } from "../../types";
import { createScroll } from "./createScoll";
const createEntity = (
  props: ScrolliumProps,
  storeObserver: ReturnType<typeof createObserver>,
  entitiesMap: Map<string, any>
) => {
  const observer = createObserver(SCROLLIUM_SCOPE);
  const stateManager = createStateManager(props);
  const mount = createMount(entitiesMap, props, storeObserver);
  const scroll = createScroll(stateManager, observer);
  return {
    stateManager,
    addEventListener: observer.subscribe,
    scroll,
    getClient() {
      return {
        addEventListener: this.addEventListener,
        getters: this.stateManager.getters,
      };
    },
    mount,
  };
};

export { createEntity };
