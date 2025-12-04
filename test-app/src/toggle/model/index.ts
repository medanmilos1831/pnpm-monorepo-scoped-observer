import {
  EventName,
  type IEvent,
  type storeConfig,
  type toggleConfigType,
} from "../types";
import { createModelContext } from "./context";

const createModel = (params: toggleConfigType, config: storeConfig) => {
  const context = createModelContext(params, config);
  const {
    messageBroker,
    logger,
    messageContainer,
    middleware,
    getInitialState,
    publishHandler,
  } = context;
  return {
    open: logger.logAction((message?: any) => {
      return publishHandler(true, message);
    }),
    close: logger.logAction((message?: any) => {
      return publishHandler(false, message);
    }),
    middleware,

    onChangeSync: (callback: () => void) => {
      return messageBroker.subscribe({
        eventName: EventName.ON_CHANGE,
        callback,
      });
    },
    onChange: (callback: (event: IEvent) => void) => {
      return messageBroker.subscribe({
        eventName: EventName.ON_CHANGE,
        callback,
      });
    },
    getMessage: () => {
      return messageContainer.getMessage();
    },
    getValue: getInitialState,
  };
};

export { createModel };
