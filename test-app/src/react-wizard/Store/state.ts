import { createScopedObserver } from "@scoped-observer/core";

export function stateFn(props: any) {
  const observer = createScopedObserver([
    {
      scope: "WIZARD_STORE_SCOPE",
    },
  ]);
  return {
    observer: {
      dispatch: (eventName: string, payload?: any) => {
        observer.dispatch({
          scope: "WIZARD_STORE_SCOPE",
          eventName,
          payload: payload || undefined,
        });
      },
      subscribe: (eventName: string, callback: (payload: any) => void) => {
        return observer.subscribe({
          scope: "WIZARD_STORE_SCOPE",
          eventName,
          callback,
        });
      },
    },
  };
}
