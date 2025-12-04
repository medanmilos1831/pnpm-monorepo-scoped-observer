import { createScopedObserver } from "@med1802/scoped-observer";
import { createMessageBroker } from "@med1802/scoped-observer-message-broker";

import { createModelLogger } from "../logger/modellogger";
import { createMessageContainer } from "../messageContainer";
import { createMiddleware } from "../middleware";
import type { toggleConfigType } from "../types";
import type { storeConfig } from "../types";

const createInfrastructure = (
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

export { createInfrastructure };
