import { createStateManager } from "./createStateManager";
import { createObserver } from "./createObserver";

const core = (() => {
  return {
    createStateManager,
    createObserver,
  };
})();

export { core };
