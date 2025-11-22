import { createModel } from "./createModel";
import { createModuleInfrastructure } from "./createModuleInfrastructure";
import type { CreateModuleConfigType } from "./types";

const framework = (function () {
  return {
    createModule<S = any, M = any, G = any, A = any>(
      moduleConfig: CreateModuleConfigType<S, M, G, A>
    ) {
      const { stateManager, observer } = createModuleInfrastructure(
        moduleConfig.name
      );
      return {
        createModel: (params: { id: string; state: S }) => {
          if (stateManager.getters.hasModel(params.id)) {
            return;
          }
          const model = createModel(moduleConfig, params);
          stateManager.mutations.createModel(params.id, model);
          console.log(
            "createModel",
            stateManager.getters.getModels()[0].commands
          );
          setTimeout(() => {
            observer.dispatch({
              eventName: `onModelMount-${params.id}`,
              payload: undefined,
            });
          }, 0);
        },
        getModelById: (id: string) => {
          return stateManager.getters.getModelById(id) as A;
        },
        removeModel: (id: string) => {
          stateManager.mutations.removeModel(id);
          observer.dispatch({
            eventName: `onModelUnmount-${id}`,
            payload: undefined,
          });
        },
        onModelMount(id: string, callback: (params: any) => void) {
          return observer.subscribe({
            eventName: `onModelMount-${id}`,
            callback,
          })!;
        },
        onModelUnmount(id: string, callback: (params: any) => void) {
          return observer.subscribe({
            eventName: `onModelUnmount-${id}`,
            callback,
          })!;
        },
      };
    },
  };
})();

export { framework };
