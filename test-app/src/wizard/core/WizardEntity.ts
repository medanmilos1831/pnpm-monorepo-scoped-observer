import {
  WizardCommands,
  WizardEvents,
  WizardStatus,
  type IMeta,
  type IRejectParams,
  type IWizardConfig,
  type IWizardStepsConfig,
} from "../types";
import { Observer } from "./Observer";
import { Step } from "./Step";

class WizardEntity {
  name: string;
  currentStep: string;
  __INIT_CONFIG__: IWizardConfig;
  __INIT_WIZZARD_STEPS_CONFIG__: IWizardStepsConfig;
  stepsMap: { [key: string]: any } = {};
  wizardStepsConfig: IWizardStepsConfig;
  isLast = false;
  isFirst = false;
  status = WizardStatus.ACTIVE;
  observer: Observer;
  eventNameBuilder: (eventName: string) => string;
  constructor(
    config: IWizardConfig,
    wizardStepsConfig: IWizardStepsConfig,
    name: string,
    observer: Observer,
    eventNameBuilder: (eventName: string) => string
  ) {
    this.name = name;
    this.observer = observer;
    this.eventNameBuilder = eventNameBuilder;
    this.__INIT_CONFIG__ = structuredClone(config);
    this.__INIT_WIZZARD_STEPS_CONFIG__ = structuredClone(wizardStepsConfig);
    this.wizardStepsConfig = wizardStepsConfig;
    this.currentStep = config.activeStep;

    wizardStepsConfig.activeSteps.forEach((step) => {
      this.stepsMap[step] = new Step(step);
    });

    this.updateNavigationProperties();
  }

  navigateToStep = (stepName: string) => {
    this.resolve(stepName)();
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
    this.resolve(this.currentStep)();
    this.setStatus(WizardStatus.ACTIVE);
  };

  executeCommand = ({
    command,
    params,
  }: {
    command: WizardCommands;
    params?: IMeta;
  }) => {
    const actionMeta = params || { actionType: "default" };
    const stepName = this.findStep({ command });
    !stepName
      ? this.handleFinish(command, actionMeta)
      : this.handleStepTransition(command, stepName, actionMeta);
  };

  private handleFinish = (command: WizardCommands, actionMeta: IMeta) => {
    this.observer.dispatch({
      eventName: this.eventNameBuilder(WizardEvents.ON_FINISH),
      payload: {
        command,
        actionMeta,
        params: this.transitionParams(this.currentStep),
        reset: this.reset,
        updateSteps: (callback: any) =>
          this.updateSteps(callback, { command, actionMeta }),
        success: () => this.setStatus(WizardStatus.SUCCESS),
      },
    });
  };

  private handleStepTransition = (
    command: WizardCommands,
    stepName: string,
    actionMeta: IMeta
  ) => {
    this.observer.dispatch({
      eventName:
        command === WizardCommands.NEXT
          ? this.eventNameBuilder(WizardEvents.ON_NEXT)
          : this.eventNameBuilder(WizardEvents.ON_PREV),
      payload: {
        command,
        resolve: this.resolve(stepName),
        reject: this.reject(stepName, command),
        params: this.transitionParams(stepName),
        actionMeta,
      },
    });
  };

  private setStatus = (status: WizardStatus) => {
    this.status = status;
    this.observer.dispatch({
      eventName: this.eventNameBuilder(WizardEvents.SET_STATUS),
    });
  };

  private updateNavigationProperties() {
    this.isLast =
      this.getCurrentIndex() === this.wizardStepsConfig.activeSteps.length - 1;
    this.isFirst = this.getCurrentIndex() === 0;
  }

  private updateSteps = (
    callback: () => string[],
    { command, actionMeta }: { command: WizardCommands; actionMeta: IMeta }
  ) => {
    const value = [...callback()];
    return () => {
      this.wizardStepsConfig.activeSteps = value;
      this.wizardStepsConfig.activeSteps.forEach((step) => {
        this.stepsMap[step] = new Step(step);
      });
      this.observer.dispatch({
        eventName: this.eventNameBuilder(WizardEvents.ON_UPDATE_STEPS),
      });

      this.observer.dispatch({
        eventName: this.eventNameBuilder(WizardEvents.NAVIGATE),
        payload: {
          command,
          actionMeta,
        },
      });
    };
  };

  private resolve(stepName: string) {
    return () => {
      this.navigate({ stepName });
      this.updateNavigationProperties();
      this.observer.dispatch({
        eventName: this.eventNameBuilder(WizardEvents.CHANGE_STEP),
      });
    };
  }

  private reject(stepName: string, command: WizardCommands) {
    return (error: IRejectParams) => {
      this.observer.dispatch({
        eventName: this.eventNameBuilder(WizardEvents.FAIL_CHANGE_STEP),
        payload: {
          command,
          message: error.message,
          params: this.transitionParams(stepName),
        },
      });
    };
  }

  private transitionParams(stepName: string) {
    return {
      transitionForm: this.currentStep,
      transitionTo: stepName,
    };
  }

  private findStep({ command }: { command: WizardCommands }): string | null {
    return command === WizardCommands.NEXT
      ? this.findNextStep()
      : this.findPrevStep();
  }

  private getCurrentIndex(): number {
    const activeSteps = this.wizardStepsConfig.activeSteps;
    return activeSteps.indexOf(this.currentStep);
  }

  private findNextStep(): string | null {
    const activeSteps = this.wizardStepsConfig.activeSteps;
    const currentIndex = this.getCurrentIndex();
    const nextIndex = currentIndex + 1;
    return nextIndex < activeSteps.length ? activeSteps[nextIndex] : null;
  }

  private findPrevStep(): string | null {
    const activeSteps = this.wizardStepsConfig.activeSteps;
    const currentIndex = this.getCurrentIndex();
    const prevIndex = currentIndex - 1;
    return prevIndex >= 0 ? activeSteps[prevIndex] : null;
  }

  private navigate({ stepName }: { stepName: string }) {
    this.currentStep = stepName;
  }
}

export { WizardEntity };
