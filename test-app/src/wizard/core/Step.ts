class Step {
  name: string;
  isCompleted = false;
  visible = false;
  state: any = undefined;
  prevState: any = undefined;
  constructor(stepName: string, config: any) {
    this.name = stepName;
    this.isCompleted = false;
    this.visible = config.visible;
  }
}

export { Step };
