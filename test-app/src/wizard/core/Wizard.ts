import {
  WizardCommands,
  WizardEvents,
  WizardStatus,
  type IMeta,
  type IWizardConfig,
  type IWizardStepsConfig,
} from "../types";
import { Observer } from "./Observer";
import { Step } from "./Step";
import { WizardNavigator } from "./WizardNavigator";

class Wizard {
  currentStep: string;
  __INIT_CONFIG__: IWizardConfig;
  __INIT_WIZZARD_STEPS_CONFIG__: IWizardStepsConfig;
  stepsMap: { [key: string]: any } = {};
  wizardStepsConfig: IWizardStepsConfig;
  isLast = false;
  isFirst = false;
  status = WizardStatus.ACTIVE;
  observer = new Observer();
  navigator: WizardNavigator;

  constructor(config: IWizardConfig, wizardStepsConfig: IWizardStepsConfig) {
    this.__INIT_CONFIG__ = structuredClone(config);
    this.__INIT_WIZZARD_STEPS_CONFIG__ = structuredClone(wizardStepsConfig);
    this.wizardStepsConfig = wizardStepsConfig;
    this.currentStep = config.activeStep;

    wizardStepsConfig.activeSteps.forEach((step) => {
      this.stepsMap[step] = new Step(step);
    });

    this.updateNavigationProperties();
    this.navigator = new WizardNavigator(this);
  }

  navigateToStep = (stepName: string) => {
    this.currentStep = stepName;
    this.updateNavigationProperties();
    this.observer.dispatch({
      eventName: WizardEvents.CHANGE_STEP,
    });
  };

  reset = () => {
    this.wizardStepsConfig.activeSteps = [
      ...this.__INIT_WIZZARD_STEPS_CONFIG__.activeSteps,
    ];
    this.stepsMap = {};
    this.wizardStepsConfig.activeSteps.forEach((step) => {
      this.stepsMap[step] = new Step(step);
    });
    this.currentStep = this.__INIT_CONFIG__.activeStep;
    this.updateNavigationProperties();
    this.observer.dispatch({
      eventName: WizardEvents.CHANGE_STEP,
    });
    this.setStatus(WizardStatus.ACTIVE);
  };

  private setStatus = (status: WizardStatus) => {
    this.status = status;
    this.observer.dispatch({
      eventName: WizardEvents.SET_STATUS,
    });
  };

  executeCommand = ({
    command,
    params,
  }: {
    command: WizardCommands;
    params?: IMeta;
  }) => {
    return this.navigator.executeCommand({ command, params });
  };

  updateNavigationProperties() {
    this.isLast =
      this.getCurrentIndex() === this.wizardStepsConfig.activeSteps.length - 1;
    this.isFirst = this.getCurrentIndex() === 0;
  }

  private getCurrentIndex(): number {
    const activeSteps = this.wizardStepsConfig.activeSteps;
    return activeSteps.indexOf(this.currentStep);
  }
}

export { Wizard };
