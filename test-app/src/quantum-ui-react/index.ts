import { useEffect, useState } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";

import { quantumUi, type IModuleConfig } from "@med1802/quantum-ui";
const quantumUiReact = (() => {
  return {
    createModule<S = any>(props: IModuleConfig<S>) {
      const createModule = quantumUi.createModule<S>(props);
      return {
        useEntitySelector: (modelId: string) => {
          const [lifecycle] = useState(() => {
            return {
              onEntityLoad: (notify: () => void) => {
                return createModule.onEntityLoad(modelId, notify);
              },
              onEntityDestroy: (notify: () => void) => {
                return createModule.onEntityDestroy(modelId, notify);
              },
            };
          });
          const [snapshot] = useState(() => () => {
            return createModule.getEntityById(modelId);
          });
          useSyncExternalStore(lifecycle.onEntityLoad, snapshot);
          useSyncExternalStore(lifecycle.onEntityDestroy, snapshot);
          return createModule.getEntityById(modelId)?.store ?? undefined;
        },
        useCreateEntity: (props: { id: string; state: S }) => {
          useEffect(() => {
            createModule.createEntity(props);
            const model = createModule.getEntityById(props.id)!;
            return () => {
              model.destroy();
            };
          }, []);
        },
        createEntity: createModule.createEntity,
        getEntityById: createModule.getEntityById,
        onEntityLoad: createModule.onEntityLoad,
        onEntityDestroy: createModule.onEntityDestroy,
      };
    },
  };
})();

export { quantumUiReact };
