import { createModuleInfrastructure } from "./createModuleInfrastructure";
import type { IModuleConfig } from "./types";

const framework = (function () {
  return {
    createModule<S = any>(moduleConfig: IModuleConfig<S>) {
      const moduleInfrastructure = createModuleInfrastructure(moduleConfig);
      return {
        createEntity: moduleInfrastructure.createEntity,
        getEntityById: moduleInfrastructure.getEntityById,
        onEntityLoad: moduleInfrastructure.onEntityLoad,
        onEntityDestroy: moduleInfrastructure.onEntityDestroy,
      };
    },
  };
})();

export { framework };
