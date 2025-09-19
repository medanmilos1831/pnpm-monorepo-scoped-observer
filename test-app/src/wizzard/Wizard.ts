import {
  createScopedObserver,
  type IScopedObserver,
} from "../scroped-observer";
import { Step } from "./Step";
import type { IStep, IWizardConfig } from "./types";

class Wizard {
  name: string;
  observer: IScopedObserver = createScopedObserver([{ scope: "wizard" }]);
  steps: string[];
  activeStep: string;
  activeSteps: string[];
  activeStepsMap: { [key: string]: IStep } = {};
  isFirst: boolean;
  isLast: boolean;
  __INIT__: IWizardConfig;
  constructor(config: IWizardConfig) {
    this.name = config.name;
    this.steps = config.steps;
    this.activeStep = config.activeStep;
    this.activeSteps = config.activeSteps;
    this.activeSteps.forEach((step) => {
      this.activeStepsMap[step] = new Step(step);
    });
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
        this.observer.dispatch({
          scope: "wizard",
          eventName: "stepChanged",
          payload: this.activeStep,
        });
      },
    });
  }

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

  nextStep = () => {
    const r = this.observer.dispatch({
      scope: "wizard",
      eventName: "onNextStep",
      payload: this.activeStep,
    });
    console.log("******R********", r);
  };

  prevStep = () => {
    this.onStepChange(
      "prevStep",
      this.steps[this.steps.indexOf(this.activeStep) - 1]
    );
  };

  onNextStepSubscribe = ({
    onNextStep,
    onFail,
  }: {
    onNextStep: (step: IStep) => boolean;
    onFail: () => void;
  }) => {
    const unsubscribe = this.observer.subscribe({
      scope: "wizard",
      eventName: "onNextStep",
      callback: () => {
        const result = onNextStep(this.activeStepsMap[this.activeStep]);
        if (result) {
          // update step history
          const { stepHistory, ...rest } = this.activeStepsMap[this.activeStep];
          this.activeStepsMap[this.activeStep].stepHistory =
            structuredClone(rest);
          // end :: update step history
          this.onStepChange(
            "nextStep",
            this.steps[this.steps.indexOf(this.activeStep) + 1]
          );
        }
        if (!result && onFail) {
          onFail();
        }
      },
    });
    return () => {
      return unsubscribe();
    };
  };

  mutateStep = (
    callback: (prev: Omit<IStep, "update" | "stepHistory">) => IStep
  ) => {
    const { stepHistory, ...rest } = this.activeStepsMap[this.activeStep];
    this.activeStepsMap = {
      ...this.activeStepsMap,
      [this.activeStep]: {
        ...this.activeStepsMap[this.activeStep],
        ...callback(rest),
      },
    };
    this.observer.dispatch({
      scope: "wizard",
      eventName: "stepUpdated",
      payload: this.activeStep,
    });
  };

  onStepUpdateSubscribe = (notify: () => void) => {
    return this.observer.subscribe({
      scope: "wizard",
      eventName: "stepUpdated",
      callback: () => {
        notify();
      },
    });
  };
  onStepUpdateNotify = () => this.activeStepsMap[this.activeStep];

  onStepChangeSubscribe = (notify: () => void) => {
    return this.observer.subscribe({
      scope: "wizard",
      eventName: "stepChanged",
      callback: () => {
        notify();
      },
    });
  };
  onStepChangeNotify = () => this.activeStep;

  logging = () => {};
}

export { Wizard };
