import { createStateManager } from "./createStateManager";
import { createObserver } from "./createObserver";

const framework = (function framework() {
  return {
    createStateManager,
    createObserver,
  };
})();

export { framework };
