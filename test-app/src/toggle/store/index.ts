import type { createModel } from "../model";
import type { storeConfig, toggleConfigType } from "../types";
import { createStoreContext } from "./context";

const createStore = (
  config: storeConfig,
  {
    defineModel,
  }: {
    defineModel: (
      params: toggleConfigType,
      config: storeConfig
    ) => ReturnType<typeof createModel>;
  }
) => {
  const context = createStoreContext(config);
  return {
    createModel: context.storeLogger.logStore((params) => {
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
};

export { createStore };
