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
  }
  subscribe = (notify: () => void) => {
    return this.observer.subscribe({
      scope: "wizzard",
      eventName: "wizzard-event",
      callback: ({ payload }: any) => {
        console.log("payload", payload);
      },
    });
  };
  dispatch = (payload: { value: any; data: any }) => {
    this.observer.dispatch({
      scope: "wizzard",
      eventName: "wizzard-event",
      payload,
    });
  };
}

export { Wizzard };
