import { createObserver } from "./createObserver";

function createStore<S = any>(state: S) {
  const observer = createObserver();
  return {
    setState: (
      callback: (state: S) => S,
      options?: {
        customEvents: string[];
      }
    ) => {
      const prevState = structuredClone(state);
      state = callback(state);
      if (options?.customEvents && options.customEvents.length > 0) {
        options.customEvents.forEach((eventName) => {
          observer.dispatch({
            eventName,
            payload: {
              prevState: prevState,
              newState: state,
            },
          });
        });
      }
      observer.dispatch({
        eventName: "setState",
        payload: {
          prevState: prevState,
          newState: state,
        },
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

    state,
  };
}

export { createStore };
