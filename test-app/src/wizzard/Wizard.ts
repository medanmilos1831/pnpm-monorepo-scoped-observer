import {
  createScopedObserver,
  type IScopedObserver,
} from "../scroped-observer";
import type { IWizardConfig } from "./types";

class Wizard {
  name: string;
  observer: IScopedObserver = createScopedObserver([{ scope: "wizard" }]);
  steps: string[];
  activeStep: string;
  activeSteps: string[];
  isFirst: boolean;
  isLast: boolean;
  __INIT__: IWizardConfig;
  constructor(config: IWizardConfig) {
    this.name = config.name;
    this.steps = config.steps;
    this.activeStep = config.activeStep;
    this.activeSteps = config.activeSteps;
    this.isFirst = this.isFirstStep();
    this.isLast = this.isLastStep();
    this.__INIT__ = structuredClone(config);
    this.observer.subscribe({
      scope: "wizard",
      eventName: "onStepChange",
      callback: ({ payload }) => {
        const { command, step } = payload;
        if (command === "nextStep" && this.isLast) {
          alert("You are on the last step");
          return;
        }
        if (command === "prevStep" && this.isFirst) {
          alert("You are on the first step");
          return;
        }
        this.activeStep = step;
        this.isFirst = this.isFirstStep();
        this.isLast = this.isLastStep();
      },
    });
  }

  nextStep = () => {
    this.onStepChange(
      "nextStep",
      this.steps[this.steps.indexOf(this.activeStep) + 1]
    );
  };

  prevStep = () => {
    this.onStepChange(
      "prevStep",
      this.steps[this.steps.indexOf(this.activeStep) - 1]
    );
  };

  private onStepChange(command: "nextStep" | "prevStep", step: string) {
    this.observer.dispatch({
      scope: "wizard",
      eventName: "onStepChange",
      payload: { command, step },
    });
  }

  private isLastStep() {
    return this.steps.indexOf(this.activeStep) === this.steps.length - 1;
  }

  private isFirstStep() {
    return this.steps.indexOf(this.activeStep) === 0;
  }
}

export { Wizard };
