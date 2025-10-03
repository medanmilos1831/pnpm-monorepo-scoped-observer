import {
  WizardStatus,
  type IWizardConfig,
  type IWizardStepsConfig,
} from "../types";
import { Step } from "./Step";

class State {
  currentStep: string;
  __INIT_CONFIG__: IWizardConfig;
  __INIT_WIZZARD_STEPS_CONFIG__: IWizardStepsConfig;
  stepsMap: { [key: string]: any } = {};
  wizardStepsConfig: IWizardStepsConfig;
  isLast = false;
  isFirst = false;
  status = WizardStatus.ACTIVE;
  constructor(config: IWizardConfig, wizardStepsConfig: IWizardStepsConfig) {
    this.__INIT_CONFIG__ = structuredClone(config);
    this.__INIT_WIZZARD_STEPS_CONFIG__ = structuredClone(wizardStepsConfig);
    this.wizardStepsConfig = wizardStepsConfig;
    this.currentStep = config.activeStep;

    wizardStepsConfig.activeSteps.forEach((step) => {
      this.stepsMap[step] = new Step(step);
    });
  }
}

export { State };
