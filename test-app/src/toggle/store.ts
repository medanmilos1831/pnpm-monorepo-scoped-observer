import { createLogger } from "./logger";
import { toggleModel } from "./toggleModel";
import {
  type storeConfig,
  type IToggleModel,
  type toggleConfigType,
} from "./types";

const createStore = (config: storeConfig) => {
  const store = new Map<
    string,
    {
      model: IToggleModel;
    }
  >();
  const logger = createLogger(store, config.logOnCreate);
  return {
    createToggle: logger.logStore((params: toggleConfigType) => {
      if (store.has(params.id)) return;
      const model = toggleModel(params);
      store.set(params.id, {
        model,
      });
    }),
    getToggle: (id: string) => {
      if (!store.has(id)) {
        throw new Error(`Toggle ${id} not found`);
      }
      const model = store.get(id)!.model;
      return {
        internal: {
          onChangeSync: model.onChangeSync,
          interceptor: model.interceptor,
        },
        client: {
          open: model.open,
          close: model.close,
          onChange: model.onChange,
          getMessage: model.getMessage,
          getValue: model.getValue,
        },
      };
    },
    hasToggle: (id: string) => {
      return store.has(id);
    },
    deleteToggle: (id: string) => {
      logger.logStore(() => {
        store.delete(id);
      });
    },
  };
};

export { createStore };
