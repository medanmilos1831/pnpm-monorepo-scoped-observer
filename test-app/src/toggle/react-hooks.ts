import { useEffect, useState } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import type { createStore } from "./store";

const createReactHooks = (store: ReturnType<typeof createStore>) => {
  return {
    useToggle: (initialValue?: boolean) => {
      useState(() => store.setValue(initialValue || false));
      const value = useSyncExternalStore(store.onChange, store.getValue);
      return [value, store.close, store.getMessage()] as [
        boolean,
        () => void,
        any
      ];
    },
    useInterceptor: (callback: any, action?: "open" | "close") => {
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
