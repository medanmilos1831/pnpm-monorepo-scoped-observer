import { createModel } from "./createModel";
import { createModuleInfrastructure } from "./createModuleInfrastructure";
import type { IModuleConfig } from "./types";
// import type { CreateModuleConfigType, IModules } from "./types";

const framework = (function () {
  return {
    createModule(moduleConfig: IModuleConfig) {
      const stateManager = createModuleInfrastructure(moduleConfig);
      return {
        createModel: stateManager.mutations.createModel,
        getModelById: stateManager.getters.getModelById,
      };
    },
  };
})();

export { framework };
