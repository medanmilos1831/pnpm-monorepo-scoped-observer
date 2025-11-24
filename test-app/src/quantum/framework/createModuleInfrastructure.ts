import { core } from "../core/core";
import type { IModules } from "./types";

const createModuleInfrastructure = (moduleName: string) => {
  const observer = core.createObserver();
  const stateManager = core.createStateManager({
    id: moduleName,
    state: {
      modules: new Map<string, IModules>(),
    },
    mutations(state) {
      return {
        createModel(modelId: string, modelClient: any) {
          state.modules.set(modelId, {
            modelClient,
            destroyModel: () => {
              state.modules.delete(modelId);
              observer.dispatch({
                eventName: `onModelUnmount-${modelId}`,
                payload: undefined,
              });
            },
          });
          setTimeout(() => {
            observer.dispatch({
              eventName: `onModelMount-${modelId}`,
              payload: undefined,
            });
          }, 0);
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
