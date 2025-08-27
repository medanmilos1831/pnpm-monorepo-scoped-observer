import { useEffect, useRef, useSyncExternalStore } from "react";
import { createScopedObserver } from "@scoped-observer/core";
import type { TransitionMap } from "./types";

const MACHINE_SCOPE = "machineScope";
const MACHINE_EVENT = "machineEvent";

type Event<T extends string, P = any> = {
  type: T;
  payload?: P;
};

const createMachine = <S extends string, T extends string, P = any>({
  init,
  transition,
}: {
  init: S;
  transition: TransitionMap<S, T>;
}) => {
  let referenceCount = 0;
  const manager = createScopedObserver([
    {
      scope: MACHINE_SCOPE,
    },
  ]);
  let initState = structuredClone(init);

  const handler = (data: Event<T, P>) => {
    if (referenceCount === 0) {
      return;
    }

    const next = transition[initState].on[data.type];
    if (!next) {
      console.warn(
        `[Machine] Invalid transition from "${initState}" using type "${data.type}"`
      );
      return;
    }
    initState = next;
    manager.dispatch({
      scope: MACHINE_SCOPE,
      eventName: MACHINE_EVENT,
      payload: data.payload,
    });
  };

  return {
    send: handler,
    useMachine() {
      const payloadRef = useRef<P | undefined>(undefined);

      const subscribe = (callback: () => void) => {
        return manager.subscribe({
          scope: MACHINE_SCOPE,
          eventName: MACHINE_EVENT,
          callback: ({ payload }: { payload: P }) => {
            payloadRef.current = payload;
            callback();
          },
        });
      };

      const state = useSyncExternalStore(subscribe, () => initState);
      useEffect(() => {
        referenceCount = referenceCount + 1;
        return () => {
          referenceCount = referenceCount - 1;
          if (referenceCount === 0) {
            initState = init;
          }
        };
      }, []);

      return {
        state: state,
        payload: payloadRef.current,
        send: handler,
      };
    },
    getState() {
      return initState;
    },
  };
};

export { createMachine };
