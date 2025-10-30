import { createObserver } from "../../observer";
import { ScrolliumAxis, ScrolliumEvents } from "../../types";
import { createStateManager } from "./StateManager/createStateManager";

const createScroll = (
  stateManager: ReturnType<typeof createStateManager>,
  observer: ReturnType<typeof createObserver>
) => {
  return {
    onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      console.log("onScroll", stateManager.state);
      stateManager.mutations.setScrollPosition(
        stateManager.state.axis === ScrolliumAxis.VERTICAL
          ? (e.target as HTMLDivElement).scrollTop
          : (e.target as HTMLDivElement).scrollLeft
      );
      observer.dispatch(ScrolliumEvents.ON_SCROLL);
    },
  };
};

export { createScroll };
