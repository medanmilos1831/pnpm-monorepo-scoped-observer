import { createScopedObserver } from "@scoped-observer/core";
import { useSyncExternalStore } from "react";
import type { TransitionMap } from "./types";

const MACHINE_SCOPE = "machineScope";
const MACHINE_EVENT = "machineEvent";

type Event<T extends string> = {
  type: T;
};

const createMachine = <S extends string, T extends string>({
  init,
  transition,
}: {
  init: S;
  transition: TransitionMap<S, T>;
}) => {
  const manager = createScopedObserver([
    {
      scope: MACHINE_SCOPE,
    },
  ]);
  let initState = structuredClone(init);

  const handler = (data: Event<T>) => {
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
    });
  };

  return {
    send: handler,
    useMachine() {
      const state = useSyncExternalStore(
        (callback) => {
          return manager.subscribe({
            scope: MACHINE_SCOPE,
            eventName: MACHINE_EVENT,
            callback,
          });
        },
        () => {
          return initState;
        }
      );

      return {
        state: state,
        send: handler,
      };
    },
    getState() {
      return initState;
    },
    setState(state: S) {
      initState = state;
      manager.dispatch({
        scope: MACHINE_SCOPE,
        eventName: MACHINE_EVENT,
      });
    },
  };
};

export { createMachine };
