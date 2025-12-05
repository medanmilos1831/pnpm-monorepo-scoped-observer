import type { storeConfig, StoreModel } from "../types";
import { createStoreInfrastructure } from "./infrastructure";

const createStoreContext = <T>(config: storeConfig) => {
  const store = new Map<string, StoreModel<T>>();
  const { storeLogger } = createStoreInfrastructure(store, config);
  return {
    storeLogger,
    store,
  };
};

export { createStoreContext };
