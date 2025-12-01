import { useState } from "react";
import type { createMessageBroker } from "../broker";
import { useEffect } from "react";
import { EventName, type EventPayload } from "./types";

const createReactHooks = (
  messageBroker: ReturnType<typeof createMessageBroker>,
  scope: string
) => {
  return {
    useToggle: () => {
      const [open, setOpen] = useState(false);
      useEffect(() => {
        const unsubscribe = messageBroker.subscribe({
          scope,
          eventName: EventName.ON_CHANGE,
          callback(data: EventPayload) {
            const { payload } = data;
            const { open, message } = payload;
            // messageCurrent = message;
            setOpen(open);
          },
        });
        return () => unsubscribe();
      }, []);
      return [open, close, undefined] as [boolean, () => void, undefined];
    },
    useOnChange: (callback: any) => {
      const unsubscribe = messageBroker.interceptor({
        scope,
        eventName: EventName.ON_CHANGE,
        onPublish: callback,
      });
      useEffect(() => {
        return () => unsubscribe();
      }, []);
    },
  };
};

export { createReactHooks };
