import { VISIBILITY_EVENT_NAME, VISIBILITY_SCOPE } from "./constants";
import { createVisibility } from "./createVisibility";
import { VISIBILITY_STATE } from "./types";

const createBrowserVisibility = () => {
  const store = new Map<string, ReturnType<typeof createVisibility>>();

  return {
    initializeItem: (name: string, initState: VISIBILITY_STATE) => {
      const instance = createVisibility(name, initState);
      store.set(name, instance);
      return {
        disconnect: () => {
          return () => {
            store.delete(name);
          };
        },
        subscribe: instance.subscribe,
        getState: instance.getState,
      };
    },
    open(name: string, payload?: any) {
      const instance = store.get(name);
      if (!instance) {
        throw new Error(`Visibility item with name "${name}" not found`);
      }
      instance.eventManager.dispatch({
        scope: VISIBILITY_SCOPE,
        eventName: VISIBILITY_EVENT_NAME.VISIBILITY_CHANGE,
        payload: {
          value: VISIBILITY_STATE.OPEN,
          data: payload,
        },
      });
    },
    close: (name: string, payload?: any) => {
      const instance = store.get(name);
      if (!instance) {
        throw new Error(`Visibility item with name "${name}" not found`);
      }
      instance.eventManager.dispatch({
        scope: VISIBILITY_SCOPE,
        eventName: VISIBILITY_EVENT_NAME.VISIBILITY_CHANGE,
        payload: {
          value: VISIBILITY_STATE.CLOSE,
          data: payload,
        },
      });
    },
  };
};

export { createBrowserVisibility };
