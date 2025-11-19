import { useEffect, useState, useSyncExternalStore } from "react";

import { quantumUi } from "@med1802/quantum-ui";
import type { CreateModuleConfigType } from "@med1802/quantum-ui/src/framework/types";

function quantumUiReact() {
  return {
    createModule<S = any, M = any, G = any, A = any>(
      props: CreateModuleConfigType<S, M, G, A>
    ) {
      const createModule = quantumUi.createModule<S, M, G, A>(props);
      return {
        useModelSelector: (modelId: string) => {
          const [mount] = useState(() => {
            return (notify: () => void) => {
              return createModule.onModelMount(modelId, () => {
                notify();
              });
            };
          });
          const [unmount] = useState(() => {
            return (notify: () => void) => {
              return createModule.onModelUnmount(modelId, () => {
                notify();
              });
            };
          });
          const [snapshot] = useState(() => () => {
            return createModule.getModelById(modelId);
          });
          let value = undefined;
          value = useSyncExternalStore(mount, snapshot);
          value = useSyncExternalStore(unmount, snapshot);
          return value;
        },
        useCreateModel: (model: any) => {
          createModule.createModel(model);

          useEffect(() => {
            return () => {
              createModule.removeModel(model.id);
            };
          }, []);
        },
        getModelById: createModule.getModelById,
        createModel: createModule.createModel,
        removeModel: createModule.removeModel,
        onModelMount: createModule.onModelMount,
        onModelUnmount: createModule.onModelUnmount,
      };
    },
  };
}

export { quantumUiReact };
