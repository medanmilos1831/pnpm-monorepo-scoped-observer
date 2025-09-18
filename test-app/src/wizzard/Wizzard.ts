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
  subscribe = this.observer.subscribe;
  stepSubscribe = (notify: any) => {
    return this.observer.subscribe({
      scope: "wizzard",
      eventName: "step-updated",
      callback: ({ payload }) => {
        // this.activeStep = payload;
        notify();
      },
    });
  };
  stepSnapshot = () => {
    return this.activeStep;
  };
  dispatch = ({ payload }: any) => {
    const { action, data } = payload;
    if (action === "step-updated") {
      this.observer.dispatch({
        scope: "wizzard",
        eventName: action,
        payload: {
          activeStep: this.activeStep,
          data: data,
        },
      });
    }
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
