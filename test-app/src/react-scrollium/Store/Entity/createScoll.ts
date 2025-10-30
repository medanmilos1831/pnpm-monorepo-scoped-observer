import { ScrolliumAxis, ScrolliumPublicEvents } from "../../types";
import { createStateManager } from "./createStateManager";

const createScroll = (stateManager: ReturnType<typeof createStateManager>) => {
  return {
    onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      stateManager.mutations.setScrollPosition(
        stateManager.state.axis === ScrolliumAxis.VERTICAL
          ? (e.target as HTMLDivElement).scrollTop
          : (e.target as HTMLDivElement).scrollLeft
      );
      stateManager.mutations.setIsScrolling(() => {
        stateManager.observer.dispatch(ScrolliumPublicEvents.ON_SCROLL_STOP);
      });
      stateManager.observer.dispatch(ScrolliumPublicEvents.ON_SCROLL);
    },
  };
};

export { createScroll };
