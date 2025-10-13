import type { IWizard } from "./types";

class Wizard {
  id: string;
  steps: string[];
  activeStep: string;
  constructor({ id, steps, activeStep }: IWizard) {
    this.id = id;
    this.steps = steps;
    this.activeStep = activeStep;
  }
  findStep = () => {
    console.log("findStep");
  };
}

export { Wizard };
