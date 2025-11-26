import { createModuleInfrastructure } from "./createModuleInfrastructure";
import type { IModuleConfig } from "./types";

const framework = (function () {
  return {
    createModule<S = any>(moduleConfig: IModuleConfig<S>) {
      const moduleInfrastructure = createModuleInfrastructure(moduleConfig);
      return {
        createStore: moduleInfrastructure.createStore,
        getStoreById: moduleInfrastructure.getStoreById,
        subscribe: moduleInfrastructure.subscribe,
        onLoad: moduleInfrastructure.onLoad,
        onDestroy: moduleInfrastructure.onDestroy,
      };
    },
  };
})();

export { framework };
