import { createObserver } from "../../observer";

import { createMount } from "./createMount";
import {
  type IEntity,
  type ScrolliumProps,
  type ScrolliumPublicEventsType,
} from "../../types";
import { createScroll } from "./createScoll";
import { createCommands } from "./createCommands";
import { createStateManager } from "./createStateManager";
const createEntity = (
  props: ScrolliumProps,
  storeObserver: ReturnType<typeof createObserver>,
  entitiesMap: Map<string, IEntity>
) => {
  const stateManager = createStateManager(props);
  const mount = createMount(entitiesMap, props, storeObserver);
  const scroll = createScroll(stateManager);
  const commands = createCommands(stateManager);
  return {
    stateManager,
    scroll,
    commands,
    mount,
    addEventListener(
      event: `${ScrolliumPublicEventsType}`,
      callback: (payload: any) => void
    ) {
      return stateManager.observer.subscribe(event, ({ payload }) => {
        callback(payload);
      });
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
