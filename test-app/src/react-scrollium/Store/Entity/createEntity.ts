import { createObserver } from "../../observer";

import { createMount } from "./createMount";
import { createStateManager } from "./StateManager/createStateManager";
import {
  SCROLLIUM_SCOPE,
  type IEntity,
  type ScrolliumProps,
  type ScrolliumPublicEventsType,
} from "../../types";
import { createScroll } from "./createScoll";
import { createCommands } from "./createCommands";
const createEntity = (
  props: ScrolliumProps,
  storeObserver: ReturnType<typeof createObserver>,
  entitiesMap: Map<string, IEntity>
) => {
  const observer = createObserver(SCROLLIUM_SCOPE);
  const stateManager = createStateManager(props);
  const mount = createMount(entitiesMap, props, storeObserver);
  const scroll = createScroll(stateManager, observer);
  const commands = createCommands(stateManager, observer);
  return {
    stateManager,
    addEventListener: (
      event: `${ScrolliumPublicEventsType}`,
      callback: (payload: any) => void
    ) => {
      return observer.subscribe(event, ({ payload }) => {
        callback(payload);
      });
    },
    scroll,
    commands,
    getClient() {
      return {
        addEventListener: this.addEventListener,
        commands: this.commands,
        getters: this.stateManager.getters,
      };
    },
    mount,
  };
};

export { createEntity };
