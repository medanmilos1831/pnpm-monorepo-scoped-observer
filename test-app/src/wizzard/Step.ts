import type { IStep } from "./types/step.types";

class Step implements IStep {
  name: string;
  state: any = undefined;
  prevState: any = undefined;
  isCompleted: boolean = false;
  constructor(params: { name: string }) {
    this.name = params.name;
  }

  reset = () => {
    this.state = undefined;
    this.prevState = undefined;
    this.isCompleted = false;
  };
}

export { Step };
