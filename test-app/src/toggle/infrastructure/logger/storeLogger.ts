import type { StoreType } from "../../types";

const createStoreLogger = <T>(store: StoreType<T>, active: boolean) => {
  return {
    logStore: <T extends (...args: any[]) => any>(callback: T): T => {
      return ((...args: Parameters<T>) => {
        callback(...args);
        if (active) {
          const allToggles = Array.from(store.entries()).map(
            ([id, { model }]) => ({
              name: id,
              value: (model as any).getValue(),
            })
          );
          console.table(allToggles);
        }
      }) as T;
    },
  };
};

export { createStoreLogger };
