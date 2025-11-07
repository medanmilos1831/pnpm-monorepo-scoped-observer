import { createStateManager } from "./createStateManager";
import { createObserver } from "./createObserver";
import { createMessageBroker } from "./createMessageBroker";

const framework = (function framework() {
  return {
    createStateManager,
    createObserver,
    createMessageBroker,
  };
})();

export { framework };
