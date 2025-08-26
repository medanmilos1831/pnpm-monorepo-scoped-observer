import { useEffect, useState } from 'react';
import { VisibilityInstance } from './VisibilityInstance';

const createVisibility = <T extends readonly string[]>(config: { keys: T }) => {
  const items: Map<T[number], VisibilityInstance> = new Map();

  return {
    useVisibility: (
      name: T[number],
      {
        initState,
      }: {
        initState?: 'open' | 'close';
      } = {}
    ) => {
      const [state] = useState(() => {
        return new VisibilityInstance(name, {
          initState: initState ?? 'close',
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
        state: 'open' | 'close';
        payload: any;
        close: () => void;
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
      });
    },

    useWatch: (name: T[number]) => {
      const item = items.get(name)!;
      const { state, payload, send } = item.machine.useMachine();

      return { state, payload, send };
    },

    getItem: (name: T[number]) => {
      let item = items.get(name);
      return item?.api;
    },
  };
};

export { createVisibility };
