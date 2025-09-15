import { VISIBILITY_EVENT_NAME, VISIBILITY_SCOPE } from "./constants";
import { createVisibility } from "./createVisibility";
import { VISIBILITY_STATE } from "./types";

const createBrowserVisibility = () => {
  const store = new Map<string, ReturnType<typeof createVisibility>>();
  const refCount = new Map<string, number>();

  return {
    initializeItem: (name: string, initState: VISIBILITY_STATE) => {
      let instance = store.get(name);
      if (!instance) {
        instance = createVisibility(name, initState);
        store.set(name, instance);
        refCount.set(name, 0);
      }
      refCount.set(name, (refCount.get(name) || 0) + 1);
      const { subscribe, getState, getPayload } = instance;
      return {
        disconnect: () => {
          return () => {
            const currentCount = refCount.get(name) || 0;
            if (currentCount <= 1) {
              store.delete(name);
              refCount.delete(name);
            } else {
              refCount.set(name, currentCount - 1);
            }
          };
        },
        subscribe,
        getState,
        getPayload,
      };
    },
    open(name: string, payload?: any) {
      const instance = store.get(name);
      if (!instance) {
        throw new Error(`Visibility item with name "${name}" not found`);
      }
      const { dispatch } = instance;
      dispatch({
        value: VISIBILITY_STATE.OPEN,
        data: payload,
      });
    },
    close: (name: string, payload?: any) => {
      const instance = store.get(name);
      if (!instance) {
        throw new Error(`Visibility item with name "${name}" not found`);
      }
      const { dispatch } = instance;
      dispatch({
        value: VISIBILITY_STATE.CLOSE,
        data: payload,
      });
    },
    getEntity: (name: string) => {
      return store.get(name)!;
    },
  };
};

export { createBrowserVisibility };
