import { Machine } from "./Machine";

const createMachine = <
  T extends Record<string, { handle(): void }>,
  S extends Extract<keyof T, string> = Extract<keyof T, string>
>({
  init,
  transition,
}: {
  init: S;
  transition: T;
}) => {
  const instance = new Machine<S>({
    init: init as any,
    transition: transition as any,
  });

  return {
    handler: instance.handler,
    forceHandler: instance.forceHandler,
    StateMachineSlot: instance.Component,
  };
};

export { createMachine };
export type { TransitionMap } from "./types";
