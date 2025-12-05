import { createStoreLogger } from "../infrastructure/logger/storeLogger";
import type { storeConfig, StoreType } from "../types";

const createStoreInfrastructure = (store: StoreType, config: storeConfig) => {
  const logger = createStoreLogger(store, config.log);
  return {
    storeLogger: logger,
  };
};

export { createStoreInfrastructure };
