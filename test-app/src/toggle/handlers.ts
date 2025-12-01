import type { createMessageBroker } from "../broker";
import { EventName, type EventPayload } from "./types";

const createHandlers = (
  messageBroker: ReturnType<typeof createMessageBroker>,
  scope: string
) => {
  function open(message?: any) {
    messageBroker.publish({
      scope,
      eventName: EventName.ON_CHANGE,
      payload: {
        open: true,
        message,
      },
    });
  }
  function close(message?: any) {
    messageBroker.publish({
      scope,
      eventName: EventName.ON_CHANGE,
      payload: {
        open: false,
        message,
      },
    });
  }
  function subscribe(
    eventName: EventName.ON_CHANGE,
    callback: (payload: EventPayload) => void
  ) {
    return messageBroker.subscribe({
      scope,
      eventName,
      callback,
    });
  }
  return {
    open,
    close,
    subscribe,
  };
};

export { createHandlers };
