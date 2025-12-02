import { createReactHooks } from "./react-hooks";
import { createStore } from "./store";
import type { toggleConfigType } from "./types";
const createReactToggleObserver = (config: {
  onCreate: (params: toggleConfigType) => {
    id: string;
    initialState: boolean;
  };
}) => {
  const store = createStore();
  const { useToggle, useInterceptor } = createReactHooks(store);
  // const obj = {} as Record<keyof T, Channel>;
  // Object.keys(params).forEach((key) => {
  //   const store = createStore(key, messageBroker, params[key]);
  //   const { useToggle, useInterceptor } = createReactHooks(store);
  //   const { open, close, getMessage, getValue, onChange } = store;
  //   obj[key as keyof T] = (() => {
  //     return {
  //       open,
  //       close,
  //       onChange,
  //       useToggle,
  //       useInterceptor,
  //       getMessage,
  //       getValue,
  //     };
  //   })();
  // });
  // return obj;
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
