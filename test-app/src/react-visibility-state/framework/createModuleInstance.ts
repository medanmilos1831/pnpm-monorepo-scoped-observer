import { core } from "../core/core";
import type { CreateModuleProps, ModuleEntityType } from "./types";

export function createModuleInstance(props: CreateModuleProps) {
  const { dispatch, subscribe } = core.createObserver("CONTEXT_OBSERVER");
  function dispatchAction(params: { eventName: string; payload: any }) {
    const { eventName, payload } = params;
    dispatch(eventName, payload);
  }
  const moduleStateManager = core.createStateManager({
    id: props.name,
    state: new Map<string, ModuleEntityType>(),
    mutations(state) {
      return {
        createEntity: (params: any) => {
          if (!state.has(params.id)) {
            const stateManager = core.createStateManager(props.entity(params));
            state.set(params.id, {
              stateManager,
              actions: props.actions(stateManager, dispatchAction),
              listeners: props.listeners(stateManager, subscribe),
            });
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
    createEntity: (props: any) => {
      // udveri da li postoji entity sa tim id-jem isto kao sto sam uradio za app tj mutacija treba samo da postavi item
      moduleStateManager.mutations.createEntity(props);
    },
    removeEntity: (id: string) => moduleStateManager.mutations.removeEntity(id),
    getEntityById: (id: string) => moduleStateManager.getters.getEntityById(id),
  };
}
