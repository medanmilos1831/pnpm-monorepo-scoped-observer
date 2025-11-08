import { core } from "../core/core";
import type { ModuleInstanceType } from "./types";

function createApp() {
  const app = core.createStateManager({
    id: "APP",
    state: {
      modules: new Map<string, ModuleInstanceType>(),
    },
    mutations(state) {
      return {
        createModule(name: string, item: ModuleInstanceType) {
          state.modules.set(name, item);
        },
      };
    },
    getters(state) {
      return {
        getModuleByName: (name: string) => state.modules.get(name)!,
        hasModule: (name: string) => state.modules.has(name),
      };
    },
  });
  return app;
}

export { createApp };
