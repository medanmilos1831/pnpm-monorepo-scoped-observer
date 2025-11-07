import { core } from "../core/core";
import type { CreateStateManagerProps } from "./types";

export function createContext(
  id: string,
  entity: (props: any) => CreateStateManagerProps<any>
) {
  const contextObserver = core.createObserver("CONTEXT_OBSERVER");
  const contextStateManager = core.createStateManager({
    id,
    state: new Map<string, any>(),
    mutations(state) {
      return {
        createEntity: (props: any) => {
          if (!state.has(props.id)) {
            state.set(props.id, core.createStateManager(entity(props)));
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
        getState: () => state,
      };
    },
  });
  return {
    createEntity: (props: any) =>
      contextStateManager.mutations.createEntity(props),
    removeEntity: (id: string) =>
      contextStateManager.mutations.removeEntity(id),
    getEntityById: (id: string) =>
      contextStateManager.getters.getEntityById(id),
  };
}
