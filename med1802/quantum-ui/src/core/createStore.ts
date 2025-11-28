import { createObserver } from "./createObserver";

function createStore<S = any>(state: S) {
  const observer = createObserver();
  let internalState = structuredClone(state);
  return {
    setState: (
      callback: (state: S) => S,
      options?: {
        customEvents?: string[];
      }
    ) => {
      internalState = callback(internalState);
      if (options?.customEvents && options.customEvents.length > 0) {
        options.customEvents.forEach((eventName) => {
          setTimeout(() => {
            observer.dispatch({
              eventName,
              payload: internalState,
            });
          }, 0);
        });
      }
      observer.dispatch({
        eventName: "setState",
        payload: internalState,
      });
    },
    subscribe: (callback: (payload?: any) => void, eventName?: string) => {
      return observer.subscribe({
        eventName: eventName || "setState",
        callback: ({ payload }: { payload: { prevState: S; newState: S } }) => {
          callback(payload);
        },
      });
    },
    getState: () => {
      return internalState;
    },
  };
}

export { createStore };
