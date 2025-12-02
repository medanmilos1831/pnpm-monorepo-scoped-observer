import { createReactHooks } from "./react-hooks";
import { createStore } from "./store";
import type { storeConfig, toggleConfigType } from "./types";
const createReactToggleObserver = (config: storeConfig) => {
  const store = createStore(config);
  const { useToggle, useInterceptor } = createReactHooks(store);

  return {
    reactHooks: {
      useToggle,
      useInterceptor,
    },
    getToggleClient: (id: string) => {
      if (!store.hasModel(id)) {
        throw new Error(`Toggle ${id} not found`);
      }
      const model = store.getModel(id);
      return {
        open: model.open,
        close: model.close,
        onChange: model.onChange,
        getMessage: model.getMessage,
        getValue: model.getValue,
      };
    },
    deleteToggle: (id: string) => {
      return store.deleteModel(id);
    },
    createToggle: (params: toggleConfigType) => {
      return store.createModel(params);
    },
  };
};

export { createReactToggleObserver };
