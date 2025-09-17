import type { IStep } from "./types/step.types";

class Step implements IStep {
  name: string;
  state: any = undefined;
  prevState: any = undefined;
  isCompleted: boolean = false;
  isChanged: boolean = false;
  constructor(params: { name: string }) {
    this.name = params.name;
  }

  reset = () => {
    this.state = undefined;
    this.prevState = undefined;
    this.isCompleted = false;
  };

  setCompleted = (isCompleted: boolean) => {
    this.isCompleted = isCompleted;
  };

  setState = (callback: (state: any) => any) => {
    this.state = callback(this.state);
  };

  getState = (callback: (state: any) => any) => {
    return callback(this.state);
  };

  setIsChanged = (isChanged: boolean) => {
    this.isChanged = isChanged;
  };
}

export { Step };
