import { core } from "../core/core";
import { createContext } from "./createContext";
import type { CreateModuleConfigType, ModuleEntityType } from "./types";

export function createModuleInstance(props: CreateModuleConfigType) {
  const scope = "MODULE_OBSERVER";
  const { dispatch, subscribe } = core.createObserver(scope);

  const moduleStateManager = core.createStateManager({
    id: props.name,
    state: {
      modules: new Map<string, ModuleEntityType>(),
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
      };
    },
  });

  return {
    createContext<T extends { id: string }>(params: T) {
      if (!moduleStateManager.getters.hasContext(params.id)) {
        const context = createContext(props, params);
        moduleStateManager.mutations.createContext(params.id, context);
      }
    },
    removeContext: (id: string) =>
      moduleStateManager.mutations.removeContext(id),
    getContextById: (id: string) =>
      moduleStateManager.getters.getContextById(id),
    onContextLoad() {
      console.log("onContextLoad");
    },
  };
}
