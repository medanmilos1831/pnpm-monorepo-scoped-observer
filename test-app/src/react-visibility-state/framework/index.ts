import { createApp } from "./createApp";
import { createContextInstance } from "./createContextInstance";
import type {
  CreateStateManagerProps,
  IContext,
  StateManagerInstance,
} from "./types";

const framework = (function () {
  const app = createApp();
  return {
    createContext<S = any, M = any, G = any, A = any, L = any>({
      name,
      entity,
      actions,
      listeners,
    }: {
      name: string;
      entity: (props: any) => CreateStateManagerProps<S>;
      actions: (props: StateManagerInstance<S, M, G>, observer: any) => A;
      listeners: (props: StateManagerInstance<S, M, G>, observer: any) => L;
    }) {
      app.mutations.createContext(name, () => {
        return createContextInstance(name, entity, actions, listeners);
      });
      const context = app.getters.getContext(name) as IContext<S, M, G, A>;
      return context;
    },
  };
})();

export { framework };
