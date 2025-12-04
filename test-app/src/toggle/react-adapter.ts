import { useEffect, useState } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import type { createStore } from "./store";
import type { middlewareParamsType, toggleConfigType } from "./types";

const createReactAdapter = (store: ReturnType<typeof createStore>) => {
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
        (message?: any) => void,
        any
      ];
    },

    useMiddleware: ({
      toggleId,
      use,
      value,
    }: {
      toggleId: string;
    } & middlewareParamsType) => {
      const model = store.getModel(toggleId);
      useEffect(() => {
        const unsubscribe = model.middleware({ use, value });
        return () => {
          unsubscribe();
        };
      });
    },
  };
};

export { createReactAdapter };
