import type { IToggleModel } from "./types";

const createLogger = (
  store: Map<string, { model: IToggleModel }>,
  active: boolean
) => {
  return {
    logOnCreate: (callback: any) => {
      callback();
      if (active) {
        const allToggles = Array.from(store.entries()).map(
          ([id, { model }]) => ({
            name: id,
            value: model.getValue(),
          })
        );
        console.table(allToggles);
      }
    },
  };
};

export { createLogger };
