import { createModel } from "./createModel";
import { createModuleInfrastructure } from "./createModuleInfrastructure";
import type { CreateModuleConfigType, IModules } from "./types";

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
          stateManager.mutations.createModel(
            params.id,
            createModel(moduleConfig, params)
          );
        },
        getModelById: (id: string) => {
          return stateManager.getters.getModelById(id) as IModules<A>;
        },
        // onModelMount(id: string, callback: (params: any) => void) {
        //   return observer.subscribe({
        //     eventName: `onModelMount-${id}`,
        //     callback,
        //   })!;
        // },
        // onModelUnmount(id: string, callback: (params: any) => void) {
        //   return observer.subscribe({
        //     eventName: `onModelUnmount-${id}`,
        //     callback,
        //   })!;
        // },
      };
    },
  };
})();

export { framework };
