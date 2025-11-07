import { framework } from "./framework";
import type { CreateStateManagerProps, IContext } from "./types";

const app = (function () {
  const context = framework.app();
  return {
    createContext<S = any, M = any, G = any>({
      name,
      entity,
    }: {
      name: string;
      entity: (props: any) => CreateStateManagerProps<S>;
    }) {
      context.mutations.createContext(name, entity);
      return context.getters.getContext(name) as IContext<S, M, G>;
    },
  };
})();

export { app };
