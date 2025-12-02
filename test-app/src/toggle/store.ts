import { createMessageBroker } from "../broker";
import { EventName, type EventPayload, type InterceptorAction } from "./types";

const createStore = (
  scope: string,
  messageBroker: ReturnType<typeof createMessageBroker>
) => {
  let lastMessage = undefined as any;
  function publishHandler(open: boolean, message?: any) {
    lastMessage = message;
    messageBroker.publish({
      scope,
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
      publishHandler(true, message);
    },
    close: (message?: any) => {
      publishHandler(false, message);
    },
    subscribe: (
      eventName: EventName.ON_CHANGE,
      callback: (payload: EventPayload) => void
    ) => {
      return messageBroker.subscribe({
        scope,
        eventName,
        callback,
      });
    },
    interceptor: (
      callback: (payload: any) => boolean | { payload: any },
      action: InterceptorAction
    ) => {
      return messageBroker.interceptor({
        scope,
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
    getMessage: () => {
      return lastMessage;
    },
  };
};

export { createStore };
