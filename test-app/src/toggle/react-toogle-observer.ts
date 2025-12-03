import { createReactAdapter } from "./react-adapter";
import { createStore } from "./store";
import type { storeConfig, toggleConfigType } from "./types";
const createReactToggleObserver = (config: storeConfig) => {
  const store = createStore(config);
  const { useToggle, useInterceptor, useInterceptorNew } =
    createReactAdapter(store);

  return {
    reactHooks: {
      useToggle,
      useInterceptor,
      useInterceptorNew,
    },
    getToggleClient: (id: string) => {
      if (!store.hasModel(id)) {
        throw new Error(`Toggle ${id} not found`);
      }
      const { open, close, onChange, getMessage, getValue } =
        store.getModel(id);
      return {
        open,
        close,
        onChange,
        getMessage,
        getValue,
      };
    },
    deleteToggle: (id: string) => {
      return store.deleteModel(id);
    },
    createToggle: (params: toggleConfigType) => {
      return store.createModel(params);
    },
    middleware: config.applyMiddleware,
  };
};

export { createReactToggleObserver };
