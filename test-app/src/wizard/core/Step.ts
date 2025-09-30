class Step {
  name: string;
  isCompleted = false;
  visible = false;
  state: any = undefined;
  prevState: any = undefined;
  status: "valid" | "invalid" = "valid";
  constructor(stepName: string, config: any) {
    this.name = stepName;
    this.isCompleted = false;
    this.visible = config.visible;
  }
}

export { Step };
