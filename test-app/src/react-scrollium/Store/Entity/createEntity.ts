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
    client() {
      return {
        id: stateManager.state.id,
        scrollPosition: stateManager.state.scrollPosition,
        axis: stateManager.state.axis,
        direction: stateManager.state.direction,
        progress: stateManager.state.progress,
        isStart: stateManager.state.isStart,
        isEnd: stateManager.state.isEnd,
        clientSize: stateManager.state.clientSize,
        scrollSize: stateManager.state.scrollSize,
        isScrolling: stateManager.state.isScrolling,
      };
    },
  };
};

export { createEntity };
