import { useEffect, useState } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";

import { quantumUi, type IModuleConfig } from "../quantum";
const quantumUiReact = (() => {
  return {
    createModule<S = any, A = any>(props: IModuleConfig<S, A>) {
      const createModule = quantumUi.createModule<S, A>(props);
      return {
        useEntitySelector: (entityId: string) => {
          const [lifecycle] = useState(() => {
            return {
              onEntityLoad: (notify: () => void) => {
                return createModule.onEntityLoad(entityId, notify);
              },
              onEntityDestroy: (notify: () => void) => {
                return createModule.onEntityDestroy(entityId, notify);
              },
            };
          });
          const [snapshot] = useState(() => () => {
            return createModule.getEntityById(entityId);
          });
          useSyncExternalStore(lifecycle.onEntityLoad, snapshot);
          useSyncExternalStore(lifecycle.onEntityDestroy, snapshot);
          return createModule.getEntityById(entityId) ?? undefined;
        },
        useCreateEntity: (props: { id: string; state: S }) => {
          createModule.createEntity(props);
          const model = createModule.getEntityById(props.id)!;
          useEffect(() => {
            return () => {
              // model.destroy();
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
