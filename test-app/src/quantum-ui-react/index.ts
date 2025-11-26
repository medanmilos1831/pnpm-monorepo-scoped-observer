import { useEffect, useState } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";

import { quantumUi, type IModuleConfig } from "../quantum";
const quantumUiReact = (() => {
  return {
    createModule<S = any, A = any>(props: IModuleConfig<S, A>) {
      const createModule = quantumUi.createModule<S, A>(props);
      return {
        useEntitySelector: (entityId: string) => {
          const [subscribe] = useState(() => {
            return (notify: () => void) => {
              const unsub1 = createModule.onEntityLoad(entityId, notify);
              const unsub2 = createModule.onEntityDestroy(entityId, notify);
              return () => {
                unsub1();
                unsub2();
              };
            };
          });
          const [snapshot] = useState(
            () => () => createModule.getEntityById(entityId)
          );
          useSyncExternalStore(subscribe, snapshot);
          return createModule.getEntityById(entityId) ?? undefined;
        },
        useCreateEntity: (props: { id: string; state: S }) => {
          createModule.createEntity(props);
          const model = createModule.getEntityById(props.id)!;
          useEffect(() => {
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
