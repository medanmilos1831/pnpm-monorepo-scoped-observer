class Step {
  name: string;
  isCompleted: boolean;
  isChanged: boolean;
  state: any = undefined;
  stepHistory = undefined;
  constructor(name: string) {
    this.name = name;
    this.isCompleted = false;
    this.isChanged = false;
    this.stepHistory = undefined;
  }
}

export { Step };
