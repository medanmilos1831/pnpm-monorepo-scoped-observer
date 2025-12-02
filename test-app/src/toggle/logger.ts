import type { IToggleModel } from "./types";

const createLogger = (
  store: Map<string, { model: IToggleModel }>,
  active: boolean
) => {
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

export { createLogger };
