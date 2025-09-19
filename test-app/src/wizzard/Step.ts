class Step {
  name: string;
  isCompleted: boolean;
  isChanged: boolean;
  state: any = undefined;
  constructor(name: string) {
    this.name = name;
    this.isCompleted = false;
    this.isChanged = false;
  }

  update = (data: any) => {
    Object.assign(this, data);
  };
}

export { Step };
