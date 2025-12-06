import { createScopedObserver } from "@med1802/scoped-observer";
import { createMessageBroker } from "@med1802/scoped-observer-message-broker";
import { createModelLogger } from "../infrastructure/logger/modellogger";
import { createMessageContainer } from "../infrastructure/messageContainer";
import { createMiddleware } from "../infrastructure/middleware";
import { type storeConfig, type toggleConfigType } from "../types";

const createModelContext = (params: toggleConfigType, config: storeConfig) => {
  let initialState = params.initialState;
  const scopedObserver = createScopedObserver();
  const messageBroker = createMessageBroker(scopedObserver);
  const logger = createModelLogger(params.id, config.log);
  const messageContainer = createMessageContainer();
  const middleware = config.middlewares
    ? createMiddleware(config.middlewares, messageBroker, messageContainer)
    : undefined;
  // Message Container
  const setMessage = messageContainer.setMessage;
  const getMessage = messageContainer.getMessage;
  // Message Broker
  const publish = messageBroker.publish;
  const subscribe = messageBroker.subscribe;
  // Logger
  const logAction = logger.logAction;
  // Initial State
  function setInitialState(state: boolean) {
    initialState = state;
  }
  function getInitialState() {
    return initialState;
  }

  return {
    scopedObserver,
    middleware,
    setInitialState,
    getInitialState,
    setMessage,
    getMessage,
    publish,
    subscribe,
    logAction,
  };
};

export { createModelContext };
