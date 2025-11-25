import { createModuleInfrastructure } from "./createModuleInfrastructure";
import type { IModuleConfig } from "./types";

const framework = (function () {
  return {
    createModule<S = any>(moduleConfig: IModuleConfig<S>) {
      const moduleInfrastructure = createModuleInfrastructure(moduleConfig);
      return {
        createModel: moduleInfrastructure.createModel,
        getModelById: moduleInfrastructure.getModelById,
        subscribe: moduleInfrastructure.subscribe,
      };
    },
  };
})();

export { framework };
