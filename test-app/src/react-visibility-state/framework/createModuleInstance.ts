import { core } from "../core/core";
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
  function dispatchFn(params: { eventName: string; payload: any }) {
    const { eventName, payload } = params;
    dispatch(eventName, payload);
  }

  function withAutoEvents(actions: Record<string, (...args: any[]) => any>) {
    const wrapped: any = {};
    Object.keys(actions).forEach((key) => {
      wrapped[key] = (...args: any[]) => {
        const result = actions[key](...args);
        dispatchFn({
          eventName: key,
          payload: result,
        });
      };
    });
    return wrapped;
  }

  return {
    createContext<T extends { id: string }>(params: T) {
      if (!moduleStateManager.getters.hasContext(params.id)) {
        const stateManager = core.createStateManager(props.entity(params));
        const wrappedActions = withAutoEvents(props.actions(stateManager));
        const item = {
          entity: stateManager,
          actions: wrappedActions,
          listeners: props.listeners(
            stateManager,
            (
              eventName: keyof typeof wrappedActions,
              callback: (payload: any) => void
            ) => {
              return subscribe(eventName, callback);
            }
          ),
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
