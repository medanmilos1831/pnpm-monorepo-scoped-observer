import { Machine } from "./Machine";
import { TransitionMap } from "./types";

const createMachine = <S extends string, T extends string = string>({
  init,
  transition,
}: {
  init: S;
  transition: TransitionMap<S, T>;
}) => {
  const instance = new Machine<S, T>({ init, transition });

  return {
    handler: instance.handler,
    StateMachineSlot: instance.Component,
    useMachine: instance.useMachine,
  };
};

export { createMachine };
export type { TransitionMap };
