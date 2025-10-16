import { WizardCommands } from "./types";
import type { IWizardConfig } from "./types";

class WizardModule {
  id: string;
  steps: string[];
  activeStep: string;
  isLast: boolean;
  isFirst: boolean;
  __INTERNAL__STEPS: string[];
  __INTERNAL__ACTIVE_STEP: string;
  constructor({
    id,
    steps,
    activeStep,
  }: Omit<IWizardConfig, "onReset" | "onFinish" | "renderOnFinish">) {
    this.__INTERNAL__STEPS = [...steps];
    this.__INTERNAL__ACTIVE_STEP = activeStep;
    this.id = id;
    this.steps = steps;
    this.activeStep = activeStep;
    this.isLast = steps.length - 1 === steps.indexOf(activeStep);
    this.isFirst = steps.indexOf(activeStep) === 0;
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
    this.isLast = this.steps.length - 1 === this.steps.indexOf(step);
    this.isFirst = this.steps.indexOf(step) === 0;
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

export { WizardModule };
