import { useSyncExternalStore } from "react";
import { createScopedObserver } from "@scoped-observer/core";
import { Slice } from "./types";

function createSlice<T, E extends string>(config: {
  scope: string;
  state: T;
  onEvent: Record<E, (state: T, payload?: any) => T>;
}): Slice<T, E> {
  const manager = createScopedObserver([{ scope: config.scope }]);

  return {
    name: config.scope,

    useSubscribe<R>(
      cb: (state: T) => R,
      events: (keyof typeof config.onEvent)[]
    ): R {
      let lastSnapshot: R = cb(config.state);

      const subscribe = (notify: () => void) => {
        const unsubscribers = events.map((eventName) =>
          manager.subscribe({
            scope: config.scope,
            eventName,
            callback() {
              lastSnapshot = cb(config.state);
              notify();
            },
          })
        );

        return () => {
          unsubscribers.forEach((u) => u());
        };
      };

      const getSnapshot = () => lastSnapshot;

      return useSyncExternalStore(subscribe, getSnapshot);
    },

    getState() {
      return config.state;
    },

    action({
      type,
      payload,
    }: {
      type: keyof typeof config.onEvent;
      payload?: any;
    }) {
      config.state = config.onEvent[type](config.state, payload);
      manager.dispatch({
        scope: config.scope,
        eventName: type,
        payload: undefined,
      });
    },
  };
}

export { createSlice };
