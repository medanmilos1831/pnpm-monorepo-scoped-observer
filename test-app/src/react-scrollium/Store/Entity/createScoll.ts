import { createObserver } from "../../observer";
import { ScrolliumEvents } from "../../types";
import { createStateManager } from "./StateManager/createStateManager";

const createScroll = (
  stateManager: ReturnType<typeof createStateManager>,
  observer: ReturnType<typeof createObserver>
) => {
  return {
    onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      stateManager.mutations.setScrollPosition(
        (e.target as HTMLDivElement).scrollTop
      );
      observer.dispatch(ScrolliumEvents.ON_SCROLL);
    },
  };
};

export { createScroll };
