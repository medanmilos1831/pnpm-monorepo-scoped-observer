import { core } from "../core/core";

const createModuleInfrastructure = (moduleName: string) => {
  const observer = core.createObserver();
  const stateManager = core.createStateManager({
    id: moduleName,
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
        hasModel: (id: string) => state.modules.has(id),
        getModels: () => Array.from(state.modules.values()),
      };
    },
  });
  return {
    stateManager,
    observer,
  };
};

export { createModuleInfrastructure };
