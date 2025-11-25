import { useEffect, useState } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";

import { quantumUi, type IModuleConfig } from "../quantum";
const quantumUiReact = (() => {
  return {
    createModule<S = any>(props: IModuleConfig<S>) {
      const createModule = quantumUi.createModule<S>(props);
      return {
        useStoreSelector: (modelId: string) => {
          const [mount] = useState(() => {
            return (notify: () => void) => {
              return createModule.subscribe((payload) => {
                notify();
              }, `onStoreCreate-${modelId}`);
            };
          });
          const [unmount] = useState(() => {
            return (notify: () => void) => {
              return createModule.subscribe((payload) => {
                notify();
              }, `onStoreDestroy-${modelId}`);
            };
          });
          const [snapshot] = useState(() => () => {
            return createModule.getStoreById(modelId);
          });
          let value = undefined;
          value = useSyncExternalStore(mount, snapshot);
          value = useSyncExternalStore(unmount, snapshot);
          return value?.store;
        },
        useCreateStore: (props: { id: string; state: S }) => {
          createModule.createStore(props);
          const model = createModule.getStoreById(props.id)!;
          useEffect(() => {
            return () => {
              model.destroy();
            };
          }, []);
        },
        createStore: createModule.createStore,
        getStoreById: createModule.getStoreById,
        subscribe: createModule.subscribe,
      };
    },
  };
})();

export { quantumUiReact };
