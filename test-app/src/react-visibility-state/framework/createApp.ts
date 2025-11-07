import { core } from "../core/core";
import { createContext } from "./createContext";
import type { CreateStateManagerProps } from "./types";

function createApp() {
  const app = core.createStateManager({
    id: "APP",
    state: {
      contexts: new Map<string, ReturnType<typeof createContext>>(),
    },
    mutations(state) {
      return {
        createContext: (
          name: string,
          entity: (props: any) => CreateStateManagerProps<any>
        ) => {
          if (!state.contexts.has(name)) {
            state.contexts.set(name, createContext(name, entity));
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
