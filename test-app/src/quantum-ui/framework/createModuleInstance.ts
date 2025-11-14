import { core } from "../core/core";
import { createModel } from "./createModel";
import type { CreateModuleConfigType } from "./types";

export function createModuleInstance(props: CreateModuleConfigType) {
  const scope = "MODULE_OBSERVER";
  const { dispatch, subscribe } = core.createObserver(scope);

  const moduleStateManager = core.createStateManager({
    id: props.name,
    state: {
      modules: new Map<string, any>(),
    },
    mutations(state) {
      return {
        createModel(name: string, model: any) {
          state.modules.set(name, model);
        },
        removeModel(id: string) {
          state.modules.delete(id);
        },
      };
    },
    getters(state) {
      return {
        getModelById: (id: string) => state.modules.get(id)!,
        getModel: (id: string) => state.modules.get(id),
        hasModel: (id: string) => state.modules.has(id),
        getAllModels: () => state.modules.values(),
        getModelCount: () => state.modules.size,
        getState: () => state,
      };
    },
  });

  return {
    createModel<T extends { id: string }>(params: T) {
      if (!moduleStateManager.getters.hasModel(params.id)) {
        const model = createModel(props, params);
        moduleStateManager.mutations.createModel(params.id, model);
      }
    },
    removeModel: (id: string) => {
      moduleStateManager.mutations.removeModel(id);
    },
    lifeCycle: (id: string) => {
      // dispatch(`onModelLoad-${id}`);
    },
    getModelById: (id: string) => moduleStateManager.getters.getModelById(id),
    hasModel: (id: string) => moduleStateManager.getters.hasModel(id),
    subscribe,
  };
}
