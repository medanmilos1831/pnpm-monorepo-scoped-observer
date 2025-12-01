import { createMessageBroker } from "../broker";
import { EventName, type EventPayload } from "./types";

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
    getMessage: () => {
      return lastMessage;
    },
  };
};

export { createStore };
