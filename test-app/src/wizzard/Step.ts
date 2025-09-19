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

  // update = (data: any) => {
  //   // console.log("******UPDATE********");
  //   this.state = data.state;
  //   this.isCompleted = data.isCompleted;
  //   this.isChanged = data.isChanged;
  // };

  // updateHistory = (data: any) => {
  //   // console.log("******UPDATE HISTORY********");
  //   this.stepHistory = structuredClone(data);
  // };
}

export { Step };
