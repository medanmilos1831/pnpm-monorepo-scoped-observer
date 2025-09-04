import { StateMachineInstance } from "./StateMachineInstance";
import type { InitializeContext } from "./types";

export function initialize<S extends string, T extends string>(
  this: InitializeContext<S, T>
): StateMachineInstance<S, T> {
  const machineInstance = new StateMachineInstance({
    machineConfig: this.machineConfig,
    config: this.config,
  });
  this.entities.set(machineInstance.handler, machineInstance);
  return machineInstance;
}
