import { core } from "../core/core";
import type { CreateModuleConfigType, ModuleEntityType } from "./types";

export function createModuleInstance(props: CreateModuleConfigType) {
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
        createContext(name: string, item: ModuleEntityType) {
          state.modules.set(name, item);
        },
        removeContext(id: string) {
          state.modules.delete(id);
        },
      };
    },
    getters(state) {
      return {
        getContextById: (id: string) => state.modules.get(id)!,
        getContext: (id: string) => state.modules.get(id),
        hasContext: (id: string) => state.modules.has(id),
        getAllContexts: () => state.modules.values(),
        getContextCount: () => state.modules.size,
        getState: () => state,
        getDispatch: () => state.dispatch,
      };
    },
  });
  return {
    createContext<T extends { id: string }>(params: T) {
      if (!moduleStateManager.getters.hasContext(params.id)) {
        const stateManager = core.createStateManager(props.entity(params));
        const item = {
          entity: stateManager,
          actions: props.actions(
            stateManager,
            moduleStateManager.getters.getDispatch()
          ),
          listeners: props.listeners(stateManager, subscribe),
        };
        moduleStateManager.mutations.createContext(params.id, item);
      }
    },
    removeContext: (id: string) =>
      moduleStateManager.mutations.removeContext(id),
    getContextById: (id: string) =>
      moduleStateManager.getters.getContextById(id),
  };
}
