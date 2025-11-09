import { createApp } from "./createApp";
import { createModuleInstance } from "./createModuleInstance";
import type { CreateModuleProps, IModule, ModuleInstanceType } from "./types";

const framework = (function () {
  const { getters, mutations } = createApp();
  const { hasModule, getModuleByName } = getters;
  const { createModule } = mutations;

  return {
    createModule<S = any, M = any, G = any, A = any, L = any>(
      props: CreateModuleProps<S, M, G, A, L>
    ) {
      if (!hasModule(props.name)) {
        const item = createModuleInstance(props);
        createModule(props.name, item);
      }
      return getModuleByName(props.name) as IModule<S, M, G, A, L>;
    },
  };
})();

export { framework };
