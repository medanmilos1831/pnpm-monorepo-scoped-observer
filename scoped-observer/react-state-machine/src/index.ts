import { useEffect, useRef, useState } from 'react';
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
  const [state, setState] = useState(machine.state);
  const payload = useRef<any>(undefined);
  useEffect(() => {
    const unsubscribe = machine.subscribe(({ state, payload: data }) => {
      payload.current = data;
      setState(state);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return {
    state,
    payload: payload.current,
  };
};

export { createMachine, useMachine };
export type { TransitionMap };
