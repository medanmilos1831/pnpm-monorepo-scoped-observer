import { WizardCommands } from "../types";
import type { IWizardConfig } from "./types";

class Wizard {
  id: string;
  steps: string[];
  activeStep: string;
  __INTERNAL__STEPS: string[];
  __INTERNAL__ACTIVE_STEP: string;
  constructor({ id, steps, activeStep }: Omit<IWizardConfig, "onReset">) {
    this.__INTERNAL__STEPS = [...steps];
    this.__INTERNAL__ACTIVE_STEP = activeStep;
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
  changeStep = (step: string) => {
    this.activeStep = step;
  };
  private findNextStep = () => {
    const currentIndex = this.steps.indexOf(this.activeStep);
    const nextIndex = currentIndex + 1;

    if (nextIndex < this.steps.length) {
      return this.steps[nextIndex];
    }

    return null;
  };

  private findPreviousStep = () => {
    const currentIndex = this.steps.indexOf(this.activeStep);
    const previousIndex = currentIndex - 1;

    if (previousIndex >= 0) {
      return this.steps[previousIndex];
    }

    return null;
  };
}

export { Wizard };
