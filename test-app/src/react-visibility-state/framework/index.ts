import { createApp } from "./createApp";
import { createModuleInstance } from "./createModuleInstance";
import type { CreateModuleConfigType, IModuleClientAPI } from "./types";

const framework = (function () {
  const { getters, mutations } = createApp();
  const { hasModule, getModuleByName } = getters;
  const { createModule } = mutations;

  return {
    createModule<S = any, M = any, G = any, A = any>(
      moduleConfig: CreateModuleConfigType<S, M, G, A>
    ) {
      if (!hasModule(moduleConfig.name)) {
        const moduleInstance = createModuleInstance(moduleConfig);
        createModule(moduleConfig.name, moduleInstance);
      }
      return getModuleByName(moduleConfig.name) as IModuleClientAPI<A>;
    },
  };
})();

export { framework };
