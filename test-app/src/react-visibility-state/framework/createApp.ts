import { core } from "../core/core";
import { createContextInstance } from "./createContextInstance";
import type { CreateModuleProps } from "./types";

function createApp({
  createModule,
}: {
  createModule: (props: any) => ReturnType<typeof createContextInstance>;
}) {
  const app = core.createStateManager({
    id: "APP",
    state: {
      modules: new Map<string, ReturnType<typeof createContextInstance>>(),
    },
    mutations(state) {
      return {
        createModule<S = any, M = any, G = any, A = any, L = any>(
          props: CreateModuleProps<S, M, G, A, L>
        ) {
          if (!state.modules.has(props.name)) {
            state.modules.set(props.name, createModule(props));
          }
          return state.modules.get(props.name)!;
        },
      };
    },
    getters(state) {
      return {
        getModuleByName: (name: string) => state.modules.get(name)!,
      };
    },
  });
  return app;
}

export { createApp };
