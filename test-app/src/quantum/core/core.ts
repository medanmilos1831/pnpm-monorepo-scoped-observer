import { createStateManager } from "./createStateManager";
import { createObserver } from "./createObserver";
import { createMessageBroker } from "./createMessageBroker";
import { createStore } from "./createStore";

const core = (() => {
  return {
    createStateManager,
    createObserver,
    createMessageBroker,
    createStore,
  };
})();

export { core };
