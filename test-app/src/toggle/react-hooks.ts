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
          // console.log("USE TOGGLE SUBSCRIBE", message);
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
    useInterceptor: (callback: any, action: "open" | "close") => {
      useEffect(() => {
        const unsubscribe = store.interceptor(callback, action);
        return () => {
          unsubscribe();
        };
      });
    },
  };
};

export { createReactHooks };
