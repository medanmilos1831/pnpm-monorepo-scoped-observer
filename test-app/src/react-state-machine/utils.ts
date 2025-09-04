import { StateMachineInstance } from "./StateMachineInstance";

export function initializeTwo(this: any) {
  const machineInstance = new StateMachineInstance({
    machineConfig: this.machineConfig,
    config: this.config,
  });
  this.entities.set(machineInstance.handler, machineInstance);
  return machineInstance;
}
