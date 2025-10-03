import {
  WizardCommands,
  WizardEvents,
  WizardStatus,
  type IMeta,
  type IRejectParams,
  type IWizardStepsConfig,
} from "../types";
import { Step } from "./Step";

class WizardNavigator {
  private wizard: any;

  constructor(wizard: any) {
    this.wizard = wizard;
  }

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
    this.wizard.observer.dispatch({
      eventName: WizardEvents.ON_FINISH,
      payload: {
        command,
        actionMeta,
        params: this.transitionParams(this.wizard.currentStep),
        reset: this.wizard.reset,
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
    this.wizard.observer.dispatch({
      eventName:
        command === WizardCommands.NEXT
          ? WizardEvents.ON_NEXT
          : WizardEvents.ON_PREV,
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
    this.wizard.status = status;
    this.wizard.observer.dispatch({
      eventName: WizardEvents.SET_STATUS,
    });
  };

  private updateSteps = (
    callback: () => string[],
    { command, actionMeta }: { command: WizardCommands; actionMeta: IMeta }
  ) => {
    const value = [...callback()];
    return () => {
      this.wizard.wizardStepsConfig.activeSteps = value;
      this.wizard.wizardStepsConfig.activeSteps.forEach((step: string) => {
        this.wizard.stepsMap[step] = new Step(step);
      });
      this.wizard.observer.dispatch({
        eventName: WizardEvents.ON_UPDATE_STEPS,
      });

      command === WizardCommands.NEXT
        ? this.wizard.observer.dispatch({
            eventName: WizardEvents.NAVIGATE,
            payload: {
              command: WizardCommands.NEXT,
              actionMeta,
            },
          })
        : this.wizard.observer.dispatch({
            eventName: WizardEvents.NAVIGATE,
            payload: {
              command: WizardCommands.PREV,
              actionMeta,
            },
          });
    };
  };

  private resolve(stepName: string) {
    return () => {
      this.navigate({ stepName });
      this.wizard.updateNavigationProperties();
      this.wizard.observer.dispatch({
        eventName: WizardEvents.CHANGE_STEP,
      });
    };
  }

  private reject(stepName: string, command: WizardCommands) {
    return (error: IRejectParams) => {
      this.wizard.observer.dispatch({
        eventName: WizardEvents.FAIL_CHANGE_STEP,
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
      transitionForm: this.wizard.currentStep,
      transitionTo: stepName,
    };
  }

  private findStep({ command }: { command: WizardCommands }): string | null {
    return command === WizardCommands.NEXT
      ? this.findNextStep()
      : this.findPrevStep();
  }

  private getCurrentIndex(): number {
    const activeSteps = this.wizard.wizardStepsConfig.activeSteps;
    return activeSteps.indexOf(this.wizard.currentStep);
  }

  private findNextStep(): string | null {
    const activeSteps = this.wizard.wizardStepsConfig.activeSteps;
    const currentIndex = this.getCurrentIndex();
    const nextIndex = currentIndex + 1;
    return nextIndex < activeSteps.length ? activeSteps[nextIndex] : null;
  }

  private findPrevStep(): string | null {
    const activeSteps = this.wizard.wizardStepsConfig.activeSteps;
    const currentIndex = this.getCurrentIndex();
    const prevIndex = currentIndex - 1;
    return prevIndex >= 0 ? activeSteps[prevIndex] : null;
  }

  private navigate({ stepName }: { stepName: string }) {
    this.wizard.currentStep = stepName;
  }
}

export { WizardNavigator };
