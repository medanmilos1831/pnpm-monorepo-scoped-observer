import { StepStatus, type IStepConfig } from "../types";

class Step {
  name: string;
  isCompleted = false;
  visible = false;
  state: any = undefined;
  prevState: any = undefined;
  status = StepStatus.REGULAR;
  constructor(stepName: string, config: IStepConfig) {
    this.name = stepName;
    this.isCompleted = false;
    this.visible = config.visible;
  }
}

export { Step };
