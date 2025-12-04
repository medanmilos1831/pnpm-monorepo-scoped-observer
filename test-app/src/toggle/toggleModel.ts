import { createScopedObserver } from "@med1802/scoped-observer";
import { createMessageBroker } from "@med1802/scoped-observer-message-broker";
import {
  EventName,
  type IEvent,
  type storeConfig,
  type toggleConfigType,
} from "./types";
import { createModelLogger } from "./logger/modellogger";
import { createInterceptor } from "./interceptor";
import { createMessageContainer } from "./messageContainer";

const toggleModel = (params: toggleConfigType, config: storeConfig) => {
  const scopedObserver = createScopedObserver();
  const messageBroker = createMessageBroker(scopedObserver);
  const logger = createModelLogger(params.id, config.log);
  const messageContainer = createMessageContainer();
  const interceptor = createInterceptor(
    config,
    messageBroker,
    messageContainer
  );
  let initialState = params.initialState;

  function publishHandler(open: boolean, message?: any) {
    messageContainer.setMessage(message);
    initialState = open;
    const payload = {
      open,
      message,
    };
    messageBroker.publish({
      eventName: EventName.ON_CHANGE,
      payload,
    });
    return {
      id: params.id,
      eventName: EventName.ON_CHANGE,
      payload,
    };
  }
  return {
    open: logger.logAction((message?: any) => {
      return publishHandler(true, message);
    }),
    close: logger.logAction((message?: any) => {
      return publishHandler(false, message);
    }),
    subscribe: (
      eventName: EventName.ON_CHANGE,
      callback: (event: IEvent) => void
    ) => {
      return messageBroker.subscribe({
        eventName,
        callback,
      });
    },
    interceptor: interceptor.interceptor,

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
    getValue: () => {
      return initialState;
    },
  };
};

export { toggleModel };
