import { useState } from "react";
import type { createMessageBroker } from "../broker";
import { useEffect } from "react";
import { EventName, type EventPayload } from "./types";
import type { createHandlers } from "./handlers";

const createReactHooks = (
  messageBroker: ReturnType<typeof createMessageBroker>,
  scope: string,
  handlers: ReturnType<typeof createHandlers>
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
            setOpen(open);
          },
        });
        return () => unsubscribe();
      }, []);
      return [open, handlers.close, undefined] as [
        boolean,
        () => void,
        undefined
      ];
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
