import { useRef, useSyncExternalStore } from 'react';
import { Machine } from './Machine';
import { TransitionMap } from './types';

const createMachine = <S extends string, T extends string = string>({
  init,
  transition,
}: {
  init: S;
  transition: TransitionMap<S, T>;
}) => {
  const instance = new Machine<S, T>({ init, transition });
  return instance;
};

const useMachine = <S extends string, T extends string = string>(
  machine: Machine<S, T>
) => {
  const payloadRef = useRef<any>(undefined);

  const subscribe = (callback: () => void) => {
    return machine.subscribe(({ payload }) => {
      payloadRef.current = payload;
      callback();
    });
  };

  const getSnapshot = () => machine.state;

  const state = useSyncExternalStore(subscribe, getSnapshot);

  return { state, payload: payloadRef.current, send: machine.handler };
};

export { createMachine, useMachine };
export type { TransitionMap };
