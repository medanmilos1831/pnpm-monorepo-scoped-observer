import type { StateMachineInstance } from "./StateMachineInstance";

/**
 * Transition map defining state transitions for each state
 * @template S - State type (string literal)
 * @template T - Event type (string literal)
 */
export type TransitionMap<S extends string, T extends string> = {
  [K in S]: {
    on: {
      [E in T]?: S;
    };
  };
};

/**
 * Event object with type property
 * @template T - Event type (string literal)
 */
export type Event<T extends string> = {
  type: T;
};

/**
 * Machine configuration defining initial state and transitions
 * @template S - State type (string literal)
 * @template T - Event type (string literal)
 */
export type MachineConfig<S extends string, T extends string> = {
  /** Initial state of the machine */
  init: S;
  /** Transition map defining state changes */
  transition: TransitionMap<S, T>;
};

/**
 * State machine instance type for external API
 * @template S - State type (string literal)
 * @template T - Event type (string literal)
 */
export type StateMachineInstanceType<S extends string, T extends string> = {
  state: S;
  send: (event: Event<T>) => void;
  useMachine: () => S;
};

/**
 * Global configuration that applies to all instances by default
 * @template S - State type (string literal)
 */
export type GlobalConfig<S extends string = string> = {
  /** Callback fired when state changes */
  onChange?: (prev: S, curr: S) => void;
  /** Override initial state */
  initState?: S;
};

/**
 * Local configuration for individual instances
 * @template S - State type (string literal)
 */
export type LocalConfig<S extends string = string> = GlobalConfig<S> & {
  /** Unique name for the instance */
  name?: string;
};

/**
 * Return type for createMachine function
 * @template S - State type (string literal)
 * @template T - Event type (string literal)
 */
export type CreateMachineReturn<S extends string, T extends string> = {
  useMachine: (localConfig?: LocalConfig<S>) => [S, (event: Event<T>) => void];
  useWatch: (
    instance: StateMachineInstanceType<S, T>,
    callback: (state: S) => any
  ) => any;
  client: () => void;
};

/**
 * Context for initializing machine instances
 * @template S - State type (string literal)
 * @template T - Event type (string literal)
 */
export type InitializeContext<S extends string, T extends string> = {
  machineConfig: MachineConfig<S, T>;
  config?: LocalConfig<S>;
  entities: Map<
    StateMachineInstance<S, T>["handler"],
    StateMachineInstance<S, T>
  >;
};

/** Scope identifier for machine events */
export const MACHINE_SCOPE = "machineScope";
/** Event name for machine state changes */
export const MACHINE_EVENT = "machineEvent";
