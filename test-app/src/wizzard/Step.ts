import type { IStep } from "./types/step.types";

class Step implements IStep {
  name: string;
  state: any = undefined;
  isCompleted: boolean = false;
  isChanged: boolean = false;
  constructor(params: { name: string }) {
    this.name = params.name;
  }
}

export { Step };
