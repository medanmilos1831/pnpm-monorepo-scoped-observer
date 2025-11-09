import { core } from "../core/core";
import type { CreateModuleProps, ModuleEntityType } from "./types";

export function createModuleInstance(props: CreateModuleProps) {
  const scope = "MODULE_OBSERVER";
  const { dispatch, subscribe } = core.createObserver(scope);

  const moduleStateManager = core.createStateManager({
    id: props.name,
    state: {
      modules: new Map<string, ModuleEntityType>(),
      dispatch: (params: { eventName: string; payload: any }) => {
        const { eventName, payload } = params;
        dispatch(eventName, payload);
      },
    },
    mutations(state) {
      return {
        createEntity(name: string, item: ModuleEntityType) {
          state.modules.set(name, item);
        },
        removeEntity(id: string) {
          state.modules.delete(id);
        },
      };
    },
    getters(state) {
      return {
        getEntityById: (id: string) => state.modules.get(id)!,
        getEntity: (id: string) => state.modules.get(id),
        hasEntity: (id: string) => state.modules.has(id),
        getAllEntities: () => state.modules.values(),
        getEntityCount: () => state.modules.size,
        getState: () => state,
        getDispatch: () => state.dispatch,
      };
    },
  });
  return {
    createEntity<T extends { id: string }>(params: T) {
      if (!moduleStateManager.getters.hasEntity(params.id)) {
        const stateManager = core.createStateManager(props.entity(params));
        const item = {
          stateManager,
          actions: props.actions(
            stateManager,
            moduleStateManager.getters.getDispatch()
          ),
          listeners: props.listeners(stateManager, subscribe),
        };
        moduleStateManager.mutations.createEntity(params.id, item);
      }
    },
    removeEntity: (id: string) => moduleStateManager.mutations.removeEntity(id),
    getEntityById: (id: string) => moduleStateManager.getters.getEntityById(id),
  };
}
