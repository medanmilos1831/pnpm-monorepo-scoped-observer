import type { createStateManager } from "./createStateManager";
import { ScrolliumAxis } from "../../types";

const createCommands = (
  stateManager: ReturnType<typeof createStateManager>
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
