import type { IWizard } from "../types/wizardProvider.types";

class Wizard {
  id: string;
  steps: string[];
  activeStep: string;
  constructor({ id, steps, activeStep }: IWizard) {
    this.id = id;
    this.steps = steps;
    this.activeStep = activeStep;
  }
}

export { Wizard };
