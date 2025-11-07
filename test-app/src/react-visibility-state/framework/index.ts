import { createApp } from "./createApp";
import { createContextInstance } from "./createContextInstance";
import type { CreateStateManagerProps, IContext } from "./types";

const framework = (function () {
  const app = createApp();
  return {
    createContext<S = any, M = any, G = any>({
      name,
      entity,
    }: {
      name: string;
      entity: (props: any) => CreateStateManagerProps<S>;
    }) {
      app.mutations.createContext(name, () => {
        return createContextInstance(name, entity);
      });
      return app.getters.getContext(name) as IContext<S, M, G>;
    },
  };
})();

export { framework };
