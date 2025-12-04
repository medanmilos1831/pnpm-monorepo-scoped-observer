import { createScopedObserver } from "@med1802/scoped-observer";
import { createMessageBroker } from "@med1802/scoped-observer-message-broker";

import type { storeConfig, toggleConfigType } from "../../types";
import { createModelLogger } from "./modellogger";
import { createMessageContainer } from "./messageContainer";
import { createMiddleware } from "./middleware";

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
