import { createStateManager } from "../core/createStateManager";
import { STORE_OBSERVER } from "../types";

function createStore<T>() {
  return createStateManager({
    id: STORE_OBSERVER,
    state: new Map<string, T>(),
    mutations(state) {
      return {
        createEntity<P extends { id: string }>(props: P, entity: () => T) {
          if (!state.has(props.id)) {
            state.set(props.id, entity());
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

        getAllEntities: () => state.values(),

        getEntityCount: () => state.size,
      };
    },
  });
}

export { createStore };
