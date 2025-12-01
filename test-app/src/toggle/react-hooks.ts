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
          const { open } = payload;
          setOpen(open);
        });
        return () => unsubscribe();
      });
      return [open, store.close, store.getMessage()] as [
        boolean,
        () => void,
        any
      ];
    },
    useInterceptor: (callback: any) => {
      useEffect(() => {
        const unsubscribe = store.interceptor(callback);
        return () => {
          unsubscribe();
        };
      });
    },
  };
};

export { createReactHooks };
