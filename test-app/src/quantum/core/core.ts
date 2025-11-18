import { createStateManager } from "./createStateManager";
import { createObserver } from "./createObserver";
import { createMessageBroker } from "./createMessageBroker";

const core = (() => {
  return {
    createStateManager,
    createObserver,
    createMessageBroker,
  };
})();

export { core };
