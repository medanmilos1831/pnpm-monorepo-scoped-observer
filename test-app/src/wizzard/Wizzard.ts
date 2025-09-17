import {
  createScopedObserver,
  type IScopedObserver,
} from "../scroped-observer";
import { Step } from "./Step";
import type { IStep, IWizzardConfig } from "./types";

class Wizzard {
  name: string;
  private readonly __INIT__: IWizzardConfig;
  steps: { [key: string]: IStep } = {};
  visibleSteps: { [key: string]: IStep } = {};
  activeStep: IStep;
  observer: IScopedObserver = createScopedObserver([
    {
      scope: "wizzard",
    },
  ]);
  isLast: boolean = false;
  isFirst: boolean = false;
  constructor(config: IWizzardConfig) {
    this.__INIT__ = structuredClone(config);
    this.name = config.name;
    config.steps.forEach((step) => {
      this.steps = {
        ...this.steps,
        [step]: new Step({
          name: step,
        }),
      };
    });
    config.defaultSteps.forEach((step) => {
      this.visibleSteps = {
        ...this.visibleSteps,
        [step]: this.steps[step],
      };
    });
    this.activeStep = this.visibleSteps[config.activeStep];
    this.setIsLast();
    this.setIsFirst();
  }
  subscribe = (notify: () => void) => {
    return this.observer.subscribe({
      scope: "wizzard",
      eventName: "wizzard-event",
      callback: ({ payload }: any) => {
        notify();
      },
    });
  };
  dispatch = ({ payload }: any) => {
    const { action } = payload;
    // console.log("ACTION", action, payload);
    if (action === "nextStep") {
      this.nextStep();
    }
    if (action === "prevStep") {
      this.prevStep();
    }
    if (action === "stepCompleted") {
      this.activeStep.setCompleted(payload.value);
    }
    this.observer.dispatch({
      scope: "wizzard",
      eventName: "wizzard-event",
      payload,
    });
  };

  nextStep = () => {
    if (!this.isLast) {
      const visibleStepKeys = Object.keys(this.visibleSteps);
      const activeStepKey = this.activeStep.name;
      const activeStepIndex = visibleStepKeys.indexOf(activeStepKey);
      const nextStepKey = visibleStepKeys[activeStepIndex + 1];
      this.activeStep = this.visibleSteps[nextStepKey];
      this.setIsLast();
      this.setIsFirst();
    }
  };

  prevStep = () => {
    if (!this.isFirst) {
      const visibleStepKeys = Object.keys(this.visibleSteps);
      const activeStepKey = this.activeStep.name;
      const activeStepIndex = visibleStepKeys.indexOf(activeStepKey);
      const prevStepKey = visibleStepKeys[activeStepIndex - 1];
      this.activeStep = this.visibleSteps[prevStepKey];
      this.setIsLast();
      this.setIsFirst();
    }
  };

  setIsLast = () => {
    const visibleStepKeys = Object.keys(this.visibleSteps);
    const activeStepKey = this.activeStep.name;
    const activeStepIndex = visibleStepKeys.indexOf(activeStepKey);
    this.isLast = activeStepIndex === visibleStepKeys.length - 1;
  };

  setIsFirst = () => {
    const visibleStepKeys = Object.keys(this.visibleSteps);
    const activeStepKey = this.activeStep.name;
    const activeStepIndex = visibleStepKeys.indexOf(activeStepKey);
    this.isFirst = activeStepIndex === 0;
  };
}

export { Wizzard };
