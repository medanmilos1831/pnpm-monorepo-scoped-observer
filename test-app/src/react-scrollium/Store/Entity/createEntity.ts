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
  function addEventListener(
    event: `${ScrolliumPublicEventsType}`,
    callback: (payload: any) => void
  ) {
    return observer.subscribe(event, ({ payload }) => {
      callback(payload);
    });
  }
  return {
    stateManager,
    scroll,
    commands,
    mount,
    addEventListener,
    cleanup() {
      stateManager.mutations.cleanup();
    },
    client() {
      return {
        id: stateManager.getters.getId(),
        scrollPosition: stateManager.getters.getScrollPosition(),
        axis: stateManager.getters.getAxis(),
        direction: stateManager.getters.getDirection(),
        progress: stateManager.getters.getProgress(),
        isStart: stateManager.getters.getIsStart(),
        isEnd: stateManager.getters.getIsEnd(),
        clientSize: stateManager.getters.getClientSize(),
        scrollSize: stateManager.getters.getScrollSize(),
        isScrolling: stateManager.getters.getIsScrolling(),
      };
    },
  };
};

export { createEntity };
