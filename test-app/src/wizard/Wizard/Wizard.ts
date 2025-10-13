import { WizardCommands } from "../types";
import type { IWizardConfig } from "./types";

class Wizard {
  id: string;
  steps: string[];
  activeStep: string;
  constructor({ id, steps, activeStep }: IWizardConfig) {
    this.id = id;
    this.steps = steps;
    this.activeStep = activeStep;
  }
  findStep = ({ command }: { command: WizardCommands }) => {
    const step =
      command === WizardCommands.NEXT
        ? this.findNextStep()
        : this.findPreviousStep();
    return step;
  };
  private findNextStep = () => {
    const currentIndex = this.steps.indexOf(this.activeStep);
    const nextIndex = currentIndex + 1;

    if (nextIndex < this.steps.length) {
      this.activeStep = this.steps[nextIndex];
      return this.steps[nextIndex];
    }

    return null;
  };

  private findPreviousStep = () => {
    const currentIndex = this.steps.indexOf(this.activeStep);
    const previousIndex = currentIndex - 1;

    if (previousIndex >= 0) {
      this.activeStep = this.steps[previousIndex];
      return this.steps[previousIndex];
    }

    return null;
  };
}

export { Wizard };
