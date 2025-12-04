import { createScopedObserver } from "@med1802/scoped-observer";
import { createMessageBroker } from "@med1802/scoped-observer-message-broker";
import { createMessageContainer } from "../infrastructure/messageContainer";
import { createMiddleware } from "../infrastructure/middleware";
import { createModelLogger } from "../infrastructure/modellogger";
import type { toggleConfigType, storeConfig } from "../types";

const createModelInfrastructure = (
  params: toggleConfigType,
  config: storeConfig
) => {
  const scopedObserver = createScopedObserver();
  const messageBroker = createMessageBroker(scopedObserver);
  const logger = createModelLogger(params.id, config.log);
  const messageContainer = createMessageContainer();
  const middleware = config.middlewares
    ? createMiddleware(config.middlewares, messageBroker, messageContainer)
    : undefined;
  return {
    scopedObserver,
    messageBroker,
    logger,
    messageContainer,
    middleware,
  };
};

export { createModelInfrastructure };
