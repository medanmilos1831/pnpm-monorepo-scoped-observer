import { useEffect, useState } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import type { createStore } from "./store";
import type { InterceptorAction, toggleConfigType } from "./types";

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

    useInterceptor: ({ id, middleware, value }: any) => {
      const model = store.getModel(id);
      useEffect(() => {
        const unsubscribe = model.interceptor({ middleware, value });
        return () => {
          unsubscribe();
        };
      });
    },
  };
};

export { createReactAdapter };
