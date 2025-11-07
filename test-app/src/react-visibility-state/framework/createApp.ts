import { core } from "../core/core";
import { createContextInstance } from "./createContextInstance";

function createApp() {
  const app = core.createStateManager({
    id: "APP",
    state: {
      contexts: new Map<string, ReturnType<typeof createContextInstance>>(),
    },
    mutations(state) {
      return {
        createContext: (
          name: string,
          createContextInstanceCallback: () => ReturnType<
            typeof createContextInstance
          >
        ) => {
          if (!state.contexts.has(name)) {
            state.contexts.set(name, createContextInstanceCallback());
          }
        },
      };
    },
    getters(state) {
      return {
        getContext: (name: string) => state.contexts.get(name)!,
      };
    },
  });
  return app;
}

export { createApp };
