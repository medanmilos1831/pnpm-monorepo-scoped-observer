import type { IStepConfig } from "../types";

class Step {
  name: string;
  isCompleted = false;
  visible = false;
  state: any = undefined;
  constructor(stepName: string, config: IStepConfig) {
    this.name = stepName;
    this.isCompleted = false;
    this.visible = config.visible;
  }
}

export { Step };
