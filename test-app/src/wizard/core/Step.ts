class Step {
  name: string;
  isCompleted = false;
  visible = false;
  constructor(stepName: string, config: any) {
    this.name = stepName;
    this.isCompleted = false;
    this.visible = config.visible;
  }
}

export { Step };
