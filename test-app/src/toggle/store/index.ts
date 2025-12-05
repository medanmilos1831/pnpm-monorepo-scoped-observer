import type { storeConfig } from "../types";
import { createStoreContext } from "./context";

function createStore<T, A extends { id: string; initialState: any }>(
  config: storeConfig,
  {
    defineModel,
  }: {
    defineModel(params: A, config: storeConfig): T;
  }
) {
  const context = createStoreContext<T>(config);
  return {
    createModel: context.storeLogger.logStore((params: A) => {
      if (context.store.has(params.id)) return;
      context.store.set(params.id, {
        model: defineModel(params, config),
      });
    }),
    getModel: (id: string) => {
      if (!context.store.has(id)) {
        throw new Error(`Toggle ${id} not found`);
      }
      const model = context.store.get(id)!.model;
      return model;
    },
    hasModel: (id: string) => {
      return context.store.has(id);
    },
    deleteModel: (id: string) => {
      context.storeLogger.logStore(() => {
        context.store.delete(id);
      });
    },
  };
}

export { createStore };
