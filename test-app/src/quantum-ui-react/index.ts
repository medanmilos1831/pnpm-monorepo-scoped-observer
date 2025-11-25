import { useEffect, useState } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";

import { quantumUi, type IModuleConfig } from "../quantum";
const quantumUiReact = (() => {
  return {
    createModule<S = any>(props: IModuleConfig<S>) {
      const createModule = quantumUi.createModule<S>(props);
      return {
        useModelSelector: (modelId: string) => {
          const [mount] = useState(() => {
            return (notify: () => void) => {
              return createModule.subscribe((payload) => {
                notify();
              }, `onModelMount-${modelId}`);
            };
          });
          const [unmount] = useState(() => {
            return (notify: () => void) => {
              return createModule.subscribe((payload) => {
                notify();
              }, `onModelUnmount-${modelId}`);
            };
          });
          const [snapshot] = useState(() => () => {
            return createModule.getModelById(modelId);
          });
          let value = undefined;
          value = useSyncExternalStore(mount, snapshot);
          value = useSyncExternalStore(unmount, snapshot);
          return value?.model;
        },
        useCreateModel: (props: { id: string; state: S }) => {
          createModule.createModel(props);
          const model = createModule.getModelById(props.id)!;
          useEffect(() => {
            return () => {
              model.removeModel();
            };
          }, []);
          // useEffect(() => {
          //   return () => {
          //     createModule.removeModel(model.id);
          //   };
          // }, []);
        },
        getModelById: createModule.getModelById,
        createModel: createModule.createModel,
        subscribe: createModule.subscribe,
      };
    },
  };
})();

export { quantumUiReact };
