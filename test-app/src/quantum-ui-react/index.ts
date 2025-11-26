import { useEffect, useState } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";

import { quantumUi, type IModuleConfig } from "../quantum";
const quantumUiReact = (() => {
  return {
    createModule<S = any>(props: IModuleConfig<S>) {
      const createModule = quantumUi.createModule<S>(props);
      return {
        useStoreSelector: (modelId: string) => {
          const [lifecycle] = useState(() => {
            return {
              onLoad: (notify: () => void) => {
                return createModule.onLoad(modelId, notify);
              },
              onDestroy: (notify: () => void) => {
                return createModule.onDestroy(modelId, notify);
              },
            };
          });
          const [snapshot] = useState(() => () => {
            return createModule.getStoreById(modelId);
          });
          useSyncExternalStore(lifecycle.onLoad, snapshot);
          useSyncExternalStore(lifecycle.onDestroy, snapshot);
          return createModule.getStoreById(modelId)?.store ?? undefined;
        },
        useCreateStore: (props: { id: string; state: S }) => {
          useEffect(() => {
            createModule.createStore(props);
            const model = createModule.getStoreById(props.id)!;
            return () => {
              model.destroy();
            };
          }, []);
        },
        createStore: createModule.createStore,
        getStoreById: createModule.getStoreById,
        onLoad: createModule.onLoad,
        onDestroy: createModule.onDestroy,
      };
    },
  };
})();

export { quantumUiReact };
