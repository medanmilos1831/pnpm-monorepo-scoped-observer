import { createApp } from "./createApp";
import { createContextInstance } from "./createContextInstance";
import type { CreateModuleProps, IModule } from "./types";

const framework = (function () {
  const app = createApp();
  return {
    createModule<S = any, M = any, G = any, A = any, L = any>({
      name,
      entity,
      actions,
      listeners,
    }: CreateModuleProps<S, M, G, A, L>) {
      app.mutations.createContext(name, () => {
        return createContextInstance(name, entity, actions, listeners);
      });
      const context = app.getters.getContext(name) as IModule<S, M, G, A, L>;
      return context;
    },
  };
})();

export { framework };
