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
      if (!store.hasToggle(id)) {
        throw new Error(`Toggle ${id} not found`);
      }
      return store.getToggle(id)!.client;
    },
    deleteToggle: (id: string) => {
      return store.deleteToggle(id);
    },
    createToggle: (params: toggleConfigType) => {
      return store.createToggle(params);
    },
  };
};

export { createReactToggleObserver };
