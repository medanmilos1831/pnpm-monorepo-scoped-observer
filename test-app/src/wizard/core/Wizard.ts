import type { IScopedObserver } from "../../scroped-observer";
import { createScopedObserver } from "../../scroped-observer";
import type { IWizardConfig, IWizardStepsConfig } from "../types";
import { Commands } from "./Commands";
import { Step } from "./Step";

class Wizard {
  observer: IScopedObserver = createScopedObserver([
    {
      scope: "wizard",
    },
  ]);
  commands: Commands = new Commands(this.observer);
  __INIT_CONFIG__: IWizardConfig;
  __INIT_WIZZARD_STEPS_CONFIG__: IWizardStepsConfig;
  stepsMap: { [key: string]: any } = {};
  constructor(config: IWizardConfig, wizardStepsConfig: IWizardStepsConfig) {
    this.__INIT_CONFIG__ = structuredClone(config);
    this.__INIT_WIZZARD_STEPS_CONFIG__ = structuredClone(wizardStepsConfig);
    wizardStepsConfig.steps.forEach((step) => {
      this.stepsMap[step] = new Step(step, {
        visible: wizardStepsConfig.activeSteps.includes(step),
      });
    });
  }
}

export { Wizard };
