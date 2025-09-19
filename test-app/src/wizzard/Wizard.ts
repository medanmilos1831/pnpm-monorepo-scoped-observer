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
  constructor(config: IWizardConfig) {
    this.name = config.name;
    this.steps = config.steps;
    this.activeStep = config.activeStep;
    this.activeSteps = config.activeSteps;

    this.observer.subscribe({
      scope: "wizard",
      eventName: "onStepChange",
      callback: ({ payload }) => {
        console.log("onStepChange", payload);
      },
    });
    // this.observer.subscribe({
    //   scope: "wizard",
    //   eventName: "stepChange",
    //   callback: () => {
    //     this.nextStep();
    //   },
    // });
  }

  nextStep() {
    this.activeStep = this.steps[this.steps.indexOf(this.activeStep) + 1];
    this.observer.dispatch({
      scope: "wizard",
      eventName: "onStepChange",
      payload: this.activeStep,
    });
  }

  prevStep() {
    this.activeStep = this.steps[this.steps.indexOf(this.activeStep) - 1];
    this.observer.dispatch({
      scope: "wizard",
      eventName: "onStepChange",
      payload: this.activeStep,
    });
  }
}

export { Wizard };
