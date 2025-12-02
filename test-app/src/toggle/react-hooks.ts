import { useEffect, useState } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import type { createStore } from "./store";
import type { toggleConfigType } from "./types";

const createReactHooks = (store: ReturnType<typeof createStore>) => {
  return {
    useToggle: (params: toggleConfigType) => {
      const [toggle] = useState(() => {
        store.createModel(params);
        return store.getModel(params.id)!;
      });
      const value = useSyncExternalStore(toggle.onChangeSync, toggle.getValue);
      useEffect(() => {
        return () => {
          store.deleteModel(params.id);
        };
      }, [params.id]);
      return [value, toggle.close, toggle.getMessage()] as [
        boolean,
        () => void,
        any
      ];
    },
    useInterceptor: ({
      id,
      callback,
      action,
    }: {
      id: string;
      callback: (payload: any) => boolean | { payload: any };
      action?: "open" | "close";
    }) => {
      const model = store.getModel(id);
      useEffect(() => {
        const unsubscribe = model.interceptor(callback, action);
        return () => {
          unsubscribe();
        };
      }, [id]);
    },
  };
};

export { createReactHooks };
