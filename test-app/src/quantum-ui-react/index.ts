import { useEffect, useState } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";

import {
  quantumUi,
  type IModuleConfig,
  type ISetState,
  type IGetState,
  type ISubscribe,
} from "../quantum";
const quantumUiReact = (() => {
  return {
    createModule<S = any, A = any>(props: IModuleConfig<S, A>) {
      const createModule = quantumUi.createModule<S, A>(props);
      return {
        useEntitySelector: (entityId: string) => {
          const [subscribe] = useState(() => {
            return (notify: () => void) => {
              const unsubscribeLoad = createModule.onEntityLoad(
                entityId,
                notify
              );
              const unsubscribeDestroy = createModule.onEntityDestroy(
                entityId,
                notify
              );
              return () => {
                unsubscribeLoad();
                unsubscribeDestroy();
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
          useEffect(() => {
            return () => {
              createModule.destroyEntity(props.id);
            };
          }, []);
        },
        createEntity: createModule.createEntity,
        getEntityById: createModule.getEntityById,
        onEntityLoad: createModule.onEntityLoad,
        onEntityDestroy: createModule.onEntityDestroy,
        hasEntity: createModule.hasEntity,
      };
    },
  };
})();

export { quantumUiReact, type ISetState, type IGetState, type ISubscribe };
