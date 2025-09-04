import type { StateMachineInstance } from "./StateMachineInstance";

export type TransitionMap<S extends string, T extends string> = {
  [K in S]: {
    on: {
      [E in T]?: S;
    };
  };
};

export type Event<T extends string> = {
  type: T;
};

export type MachineConfig<S extends string, T extends string> = {
  init: S;
  transition: TransitionMap<S, T>;
};

export type StateMachineInstanceType<S extends string, T extends string> = {
  state: S;
  send: (event: Event<T>) => void;
  useMachine: () => S;
};

export type CreateMachineConfig<S extends string = string> = {
  onChange?: (prev: S, curr: S) => void;
  initState?: S;
};

export type CreateMachineReturn<S extends string, T extends string> = {
  useMachine: (
    config?: CreateMachineConfig<S>
  ) => [S, (event: Event<T>) => void];
  useWatch: (
    instance: StateMachineInstanceType<S, T>,
    callback: (state: S) => any
  ) => any;
  client: () => void;
};

export type InitializeContext<S extends string, T extends string> = {
  machineConfig: MachineConfig<S, T>;
  config?: CreateMachineConfig<S>;
  entities: Map<
    StateMachineInstance<S, T>["handler"],
    StateMachineInstance<S, T>
  >;
};

export const MACHINE_SCOPE = "machineScope";
export const MACHINE_EVENT = "machineEvent";
