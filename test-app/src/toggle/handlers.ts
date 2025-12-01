import type { createMessageBroker } from "../broker";
import { EventName } from "./types";

const createHandlers = (
  messageBroker: ReturnType<typeof createMessageBroker>,
  scope: string
) => {
  let messageCurrent: any = undefined;
  function open(message?: any) {
    messageCurrent = undefined;
    messageBroker.publish({
      scope,
      eventName: EventName.ON_CHANGE,
      payload: {
        open: true,
        message: message ?? undefined,
      },
    });
  }
  function close() {
    messageCurrent = undefined;
    console.log("CLOSE", messageCurrent);
    messageBroker.publish({
      scope,
      eventName: EventName.ON_CHANGE,
      payload: {
        open: false,
        message: undefined,
      },
    });
  }
  function subscribe(
    eventName: EventName.ON_CHANGE,
    callback: (payload: any) => void
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
