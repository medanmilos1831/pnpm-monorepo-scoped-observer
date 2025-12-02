import { createLogger } from "./logger";
import { toggleModel } from "./toggleModel";
import {
  type storeConfig,
  type StoreModel,
  type toggleConfigType,
} from "./types";

const createStore = (config: storeConfig) => {
  const store = new Map<string, StoreModel>();
  const logger = createLogger(store, config.log);
  return {
    createModel: logger.logStore((params: toggleConfigType) => {
      if (store.has(params.id)) return;
      const model = toggleModel(params);
      store.set(params.id, {
        model,
      });
    }),
    getModel: (id: string) => {
      if (!store.has(id)) {
        throw new Error(`Toggle ${id} not found`);
      }
      const model = store.get(id)!.model;
      return model;
    },
    hasModel: (id: string) => {
      return store.has(id);
    },
    deleteModel: (id: string) => {
      logger.logStore(() => {
        store.delete(id);
      });
    },
  };
};

export { createStore };
