import type { storeConfig, StoreType } from "../../types";
import { createStoreLogger } from "./storeLogger";

const createStoreInfrastructure = (store: StoreType, config: storeConfig) => {
  const logger = createStoreLogger(store, config.log);
  return {
    logger,
  };
};

export { createStoreInfrastructure, createStoreLogger };
