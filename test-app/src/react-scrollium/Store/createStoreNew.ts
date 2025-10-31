import { SCROLLIUM_STORE_SCOPE } from "../types";
import { createEntityBase } from "./createEntityBase";

function createStoreNew<T>() {
  return createEntityBase({
    id: SCROLLIUM_STORE_SCOPE,
    state: new Map<string, T>(),
    mutations(state) {
      return {
        createEntity<P extends { id: string }>(props: P, entity: T) {
          if (!state.has(props.id)) {
            state.set(props.id, entity);
          }
        },
        removeEntity: (id: string) => {
          state.delete(id);
        },
      };
    },
    getters(state) {
      return {
        getEntityById: (id: string) => state.get(id)!,
        getEntity: (id: string) => state.get(id),
        hasEntity: (id: string) => state.has(id),
        // getEntityClient: (id: string) => {
        //   const entity = state.get(id);
        //   if (!entity) {
        //     throw new Error(`Entity ${id} not found`);
        //   }
        //   return {
        // addEventListener: entity.addEventListener,
        // commands: entity.modules.commands,
        // getters: entity.stateManager.getters,
        //   };
        // },
        getAllEntities: () => state.values(),
        getEntityCount: () => state.size,
      };
    },
  });
}

export { createStoreNew };
