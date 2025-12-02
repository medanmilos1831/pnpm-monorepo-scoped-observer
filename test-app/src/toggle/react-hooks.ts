import { useEffect, useState } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import type { createStore } from "./store";
import type { toggleConfigType } from "./types";

const createReactHooks = (store: ReturnType<typeof createStore>) => {
  return {
    useToggle: (params: toggleConfigType) => {
      const [toggle] = useState(() => {
        store.createToggle(params);
        return store.getToggle(params.id)!;
      });
      const value = useSyncExternalStore(
        toggle.internal.onChangeSync,
        toggle.client.getValue
      );
      return [value, toggle.client.close, toggle.client.getMessage()] as [
        boolean,
        () => void,
        any
      ];
    },
    useInterceptor: ({
      sliceId,
      callback,
      action,
    }: {
      sliceId: string;
      callback: (payload: any) => boolean | { payload: any };
      action?: "open" | "close";
    }) => {
      // const slice = store.getToggle(sliceId);
      // useEffect(() => {
      //   const unsubscribe = slice.interceptor(callback, action);
      //   return () => {
      //     unsubscribe();
      //   };
      // });
    },
  };
};

export { createReactHooks };
