import type { storeConfig, StoreModel } from "../types";
import { createStoreInfrastructure } from "./infrastructure";

const createStoreContext = (config: storeConfig) => {
  const store = new Map<string, StoreModel>();
  const { storeLogger } = createStoreInfrastructure(store, config);
  return {
    storeLogger,
    store,
  };
};

export { createStoreContext };
