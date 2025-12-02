import { createScopedObserver } from "@med1802/scoped-observer";
import { createMessageBroker } from "@med1802/scoped-observer-message-broker";
import {
  EventName,
  type EventPayload,
  type InterceptorAction,
  type toggleConfigType,
} from "./types";
import { createModelLogger } from "./modellogger";

const toggleModel = (params: toggleConfigType, activeLogger: boolean) => {
  const scopedObserver = createScopedObserver();
  const messageBroker = createMessageBroker(scopedObserver);
  const logger = createModelLogger(params.id, activeLogger);
  let lastMessage = undefined as any;
  let initialState = params.initialState;
  let id = params.id;

  function publishHandler(open: boolean, message?: any) {
    lastMessage = message;
    initialState = open;
    messageBroker.publish({
      eventName: EventName.ON_CHANGE,
      payload: {
        open,
        message,
      },
    });
  }
  function handleInterceptor(
    callback: (payload: any) => boolean | { payload: any },
    payload: any,
    eventName: string
  ) {
    const result = callback(payload.message);
    if (result === false && typeof result === "boolean") {
      return false;
    }

    let mutatedPayload = {
      ...payload,
      message: result,
    };
    lastMessage = mutatedPayload.message;
    return {
      eventName,
      payload: mutatedPayload,
    };
  }
  return {
    open: (message?: any) => {
      logger.logAction(publishHandler, true)(true, message);
    },
    close: (message?: any) => {
      logger.logAction(publishHandler, false)(false, message);
    },
    subscribe: (
      eventName: EventName.ON_CHANGE,
      callback: (payload: EventPayload) => void
    ) => {
      return messageBroker.subscribe({
        eventName,
        callback,
      });
    },
    interceptor: (
      callback: (payload: any) => boolean | { payload: any },
      action?: InterceptorAction
    ) => {
      return messageBroker.interceptor({
        eventName: EventName.ON_CHANGE,
        onPublish: ({ eventName, payload }) => {
          let obj = {
            open: true,
            close: false,
          };
          if (action && obj[action] === payload.open) {
            return handleInterceptor(callback, payload, eventName);
          }
          if (!action) {
            return handleInterceptor(callback, payload, eventName);
          }
          return {
            eventName,
            payload,
          };
        },
      });
    },
    onChangeSync: (callback: () => void) => {
      return messageBroker.subscribe({
        eventName: EventName.ON_CHANGE,
        callback,
      });
    },
    onChange: (callback: (payload: EventPayload) => void) => {
      return messageBroker.subscribe({
        eventName: EventName.ON_CHANGE,
        callback,
      });
    },
    getMessage: () => {
      return lastMessage;
    },
    getValue: () => {
      return initialState;
    },
  };
};

export { toggleModel };
