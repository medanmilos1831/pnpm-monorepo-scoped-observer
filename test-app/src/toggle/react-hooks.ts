import { useEffect, useState } from "react";
import type { createHandlers } from "./handlers";
import { EventName } from "./types";

const createReactHooks = (handlers: ReturnType<typeof createHandlers>) => {
  return {
    useToggle: () => {
      const [open, setOpen] = useState(false);
      useEffect(() => {
        const unsubscribe = handlers.subscribe(EventName.ON_CHANGE, (data) => {
          const { payload } = data;
          const { open, message } = payload;
          setOpen(open);
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
      // const unsubscribe = messageBroker.interceptor({
      //   scope,
      //   eventName: EventName.ON_CHANGE,
      //   onPublish: callback,
      // });
      // useEffect(() => {
      //   return () => unsubscribe();
      // }, []);
    },
  };
};

export { createReactHooks };
