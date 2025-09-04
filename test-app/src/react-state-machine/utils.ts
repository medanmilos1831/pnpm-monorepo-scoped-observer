import { StateMachineInstance } from "./StateMachineInstance";
import type { InitializeContext } from "./types";

/**
 * Initializes a new StateMachineInstance and registers it in the entities map
 * @template S - State type (string literal)
 * @template T - Event type (string literal)
 * @param this - InitializeContext containing machine config, local config, and entities map
 * @returns New StateMachineInstance
 */
export function initialize<S extends string, T extends string>(
  this: InitializeContext<S, T>
): StateMachineInstance<S, T> {
  // Create new machine instance with provided configuration
  const machineInstance = new StateMachineInstance({
    machineConfig: this.machineConfig,
    config: this.config,
  });

  // Register instance in entities map using handler as key
  this.entities.set(machineInstance.handler, machineInstance);

  return machineInstance;
}
