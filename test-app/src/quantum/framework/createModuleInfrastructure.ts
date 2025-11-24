import { core } from "../core/core";
import { createModel } from "./createModel";
import type { IModuleConfig } from "./types";

const createModuleInfrastructure = (moduleConfig: IModuleConfig) => {
  const observer = core.createObserver();
  const stateManager = core.createStateManager({
    id: moduleConfig.id,
    state: {
      modules: new Map<
        string,
        {
          modelClient: any;
          destroyModel: () => void;
        }
      >(),
    },
    mutations(state) {
      return {
        createModel({
          id: modelId,
          state: modelState,
        }: {
          id: string;
          state: any;
        }) {
          state.modules.set(modelId, {
            modelClient: (() => {
              const modelClient = createModel(moduleConfig, {
                id: modelId,
                state: modelState,
              });
              return modelClient;
            })(),
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
          console.log(state.modules);
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
  return stateManager;
};

export { createModuleInfrastructure };
