import { createScopedObserver } from "@med1802/scoped-observer";
import {
  EventName,
  type EventPayload,
  type InterceptorAction,
  type toggleConfigType,
} from "./types";
import { createMessageBroker } from "@med1802/scoped-observer-message-broker";

const toggleModel = (params: toggleConfigType) => {
  const scopedObserver = createScopedObserver();
  const messageBroker = createMessageBroker(scopedObserver);
  let lastMessage = undefined as any;
  let initialState = params.initialState;
  let id = params.id;

  function publishHandler(open: boolean, message?: any) {
    lastMessage = message;
    messageBroker.publish({
      eventName: EventName.ON_CHANGE,
      payload: {
        open,
        message,
      },
    });

    // config.logger({
    //   eventName: EventName.ON_CHANGE,
    //   payload: {
    //     open,
    //     message,
    //   },
    // });
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
    onChangeSync: (notify: () => void) => {
      return messageBroker.subscribe({
        eventName: EventName.ON_CHANGE,
        callback: ({ payload }: EventPayload) => {
          const { open } = payload;
          initialState = open;
          notify();
        },
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
