import type { StoreType } from "../../types";

const createStoreLogger = (store: StoreType, active: boolean) => {
  return {
    logStore: <T extends (...args: any[]) => any>(callback: T): T => {
      return ((...args: Parameters<T>) => {
        callback(...args);
        if (active) {
          const allToggles = Array.from(store.entries()).map(
            ([id, { model }]) => ({
              name: id,
              value: model.getValue(),
            })
          );
          console.table(allToggles);
        }
      }) as T;
    },
  };
};

export { createStoreLogger };
