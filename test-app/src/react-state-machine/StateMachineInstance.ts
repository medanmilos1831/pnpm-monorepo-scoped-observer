import { createScopedObserver } from "@scoped-observer/core";
import {
  MACHINE_EVENT,
  MACHINE_SCOPE,
  type Event,
  type TransitionMap,
  type MachineConfig,
  type LocalConfig,
} from "./types";

/**
 * StateMachineInstance represents a single state machine instance
 * @template S - State type (string literal)
 * @template T - Event type (string literal)
 */
export class StateMachineInstance<S extends string, T extends string> {
  /** Instance name for identification */
  name: string;
  /** Current state of the machine */
  state: S;
  /** Transition map defining state changes */
  transition: TransitionMap<S, T>;
  /** Local configuration for this instance */
  config: LocalConfig<S>;
  /** Scoped observer for state change notifications */
  target = createScopedObserver([
    {
      scope: MACHINE_SCOPE,
    },
  ]);

  /**
   * Creates a new StateMachineInstance
   * @param config - Configuration object containing machine config and local config
   */
  constructor(config: {
    machineConfig: MachineConfig<S, T>;
    config?: LocalConfig<S>;
  }) {
    // Initialize state from local config or machine config
    this.state = config.config?.initState || config.machineConfig.init;
    this.transition = config.machineConfig.transition;
    this.config = config.config || {};
    this.name = config.config?.name || "";
  }

  /**
   * Event handler that processes state transitions
   * @param event - Event to process
   */
  handler = (event: Event<T>) => {
    // Get next state from transition map
    const next = this.transition[this.state].on[event.type];
    if (!next) {
      console.warn(
        `[Machine] Invalid transition from "${this.state}" using type "${event.type}"`
      );
      return;
    }

    // Store previous state and update current state
    let prev = this.state;
    this.state = next;

    // Call onChange callback if provided
    this.config.onChange?.(prev, this.state);

    // Dispatch state change event
    this.target.dispatch({
      scope: MACHINE_SCOPE,
      eventName: MACHINE_EVENT,
    });
  };
}
