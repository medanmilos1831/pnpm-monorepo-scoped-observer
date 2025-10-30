import type { createStateManager } from "./StateManager/createStateManager";
import type { createObserver } from "../../observer";
import { ScrolliumAxis } from "../../types";

const createCommands = (
  stateManager: ReturnType<typeof createStateManager>,
  observer: ReturnType<typeof createObserver>
) => {
  return {
    scrollTo: (options?: ScrollToOptions) => {
      stateManager.state.element?.scrollTo(options);
    },
    scrollToStart: (options?: ScrollOptions) => {
      const scrollPro =
        stateManager.state.axis === ScrolliumAxis.VERTICAL ? "top" : "left";
      stateManager.state.element?.scrollTo({
        [scrollPro]: 0,
        ...options,
      });
    },
    scrollToEnd: (options?: ScrollOptions) => {
      const scrollPro =
        stateManager.state.axis === ScrolliumAxis.VERTICAL ? "top" : "left";

      stateManager.state.element?.scrollTo({
        [scrollPro]: stateManager.state.scrollSize,
        ...options,
      });
    },
  };
};

export { createCommands };
