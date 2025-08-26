import { useEffect, useState } from "react";
import { VisibilityInstance } from "./VisibilityInstance";
import type { UseWatchReturn } from "./type";

const createVisibility = <T extends readonly string[]>(config: { keys: T }) => {
  const items: Map<T[number], VisibilityInstance> = new Map();

  return {
    useVisibility: (
      name: T[number],
      {
        initState,
      }: {
        initState?: "open" | "close";
      } = {}
    ) => {
      const [state] = useState(() => {
        return new VisibilityInstance(name, {
          initState: initState ?? "close",
        });
      });
      items.set(name, state);
      return state.api;
    },

    VisibilityHandler: ({
      children,
      name,
    }: {
      children: (props: {
        state: "open" | "close";
        payload: any;
        close: () => void;
        open: () => void;
      }) => JSX.Element;
      name: T[number];
    }) => {
      const item = items.get(name);
      if (!item) {
        return null;
      }
      const { state, payload } = item.machine.useMachine();
      useEffect(() => {
        return () => {
          const instance = items.get(name);
          instance?.api.reset();
          items.delete(name);
        };
      }, []);
      return children({
        state,
        payload,
        close: item.api.close,
        open: item.api.open,
      });
    },

    useWatch: <C = undefined>(
      name: T[number],
      callback?: (state: "open" | "close", payload: any) => C
    ): UseWatchReturn<C> => {
      const item = items.get(name)!;
      const { state, payload } = item.machine.useMachine();

      if (callback) {
        const callbackResult = callback(state, payload);
        return { state, payload, callbackValue: callbackResult } as any;
      }

      return { state, payload, ...item.api } as any;
    },

    getItem: (name: T[number]) => {
      let item = items.get(name)!;
      return item.api;
    },
  };
};

export { createVisibility };
