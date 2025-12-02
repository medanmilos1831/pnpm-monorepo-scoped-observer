import { useEffect, useState } from "react";
import type { createStore } from "./store";
import { EventName } from "./types";

const createReactHooks = (store: ReturnType<typeof createStore>) => {
  return {
    useToggle: () => {
      const [open, setOpen] = useState(false);
      useEffect(() => {
        const unsubscribe = store.subscribe(EventName.ON_CHANGE, (data) => {
          const { payload } = data;
          const { open } = payload;
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
