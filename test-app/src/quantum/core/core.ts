import { createObserver } from "./createObserver";
import { createMessageBroker } from "./createMessageBroker";
import { createStore } from "./createStore";

const core = (() => {
  return {
    createObserver,
    createMessageBroker,
    createStore,
  };
})();

export { core };
