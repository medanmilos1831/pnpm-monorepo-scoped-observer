import { createStoreLogger } from "./infrastructure/store/storeLogger";
import { createModel } from "./api/model";

import {
  type storeConfig,
  type StoreModel,
  type toggleConfigType,
} from "./types";

const createStore = (config: storeConfig) => {
  const store = new Map<string, StoreModel>();
  const logger = createStoreLogger(store, config.log);
  return {
    createModel: logger.logStore((params: toggleConfigType) => {
      if (store.has(params.id)) return;
      const model = createModel(params, config);
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
