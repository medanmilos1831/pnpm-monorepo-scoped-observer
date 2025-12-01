import { useEffect, useState } from "react";
import type { createHandlers } from "./handlers";
import { EventName } from "./types";
import type { createStore } from "./store";

const createReactHooks = (store: ReturnType<typeof createStore>) => {
  return {
    useToggle: () => {
      const [open, setOpen] = useState(false);
      useEffect(() => {
        const unsubscribe = store.subscribe(EventName.ON_CHANGE, (data) => {
          const { payload } = data;
          const { open, message } = payload;
          setOpen(open);
        });
        return () => unsubscribe();
      }, []);
      return [open, store.close, store.getMessage()] as [
        boolean,
        () => void,
        any
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
