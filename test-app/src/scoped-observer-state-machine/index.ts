import { useRef, useSyncExternalStore } from 'react';
import { createScopedObserver } from '../scoped-observer';
import { TransitionMap } from './types';

const MACHINE_SCOPE = 'machineScope';
const MACHINE_EVENT = 'machineEvent';

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
  const manager = createScopedObserver([
    {
      scope: MACHINE_SCOPE,
    },
  ]);

  const handler = (data: Event<T, P>) => {
    const next = transition[init].on[data.type];
    if (!next) {
      console.warn(
        `[Machine] Invalid transition from "${init}" using type "${data.type}"`
      );
      return;
    }
    init = next;
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

      const state = useSyncExternalStore(subscribe, () => init);

      return {
        state: state,
        payload: payloadRef.current,
        send: handler,
      };
    },
  };
};

export { createMachine };
