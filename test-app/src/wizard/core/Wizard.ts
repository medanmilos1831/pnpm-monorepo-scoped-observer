import type { IScopedObserver } from "../../scroped-observer";
import { createScopedObserver } from "../../scroped-observer";
import {
  WizardCommands,
  WizardEvents,
  type INavigationValidationParams,
  type IWizardConfig,
  type IWizardStepsConfig,
} from "../types";
import { Commands } from "./Commands";
import { Step } from "./Step";

class Wizard {
  currentStep: string;
  observer: IScopedObserver = createScopedObserver([
    {
      scope: "wizard",
      subScopes: [
        {
          scope: "commands",
        },
        {
          scope: "step",
        },
      ],
    },
  ]);

  commands: Commands = new Commands(this.observer);
  __INIT_CONFIG__: IWizardConfig;
  __INIT_WIZZARD_STEPS_CONFIG__: IWizardStepsConfig;
  stepsMap: { [key: string]: any } = {};
  wizardStepsConfig: IWizardStepsConfig;

  constructor(config: IWizardConfig, wizardStepsConfig: IWizardStepsConfig) {
    this.__INIT_CONFIG__ = structuredClone(config);
    this.__INIT_WIZZARD_STEPS_CONFIG__ = structuredClone(wizardStepsConfig);
    this.wizardStepsConfig = wizardStepsConfig;
    this.currentStep = config.activeStep;
    wizardStepsConfig.steps.forEach((step) => {
      this.stepsMap[step] = new Step(step, {
        visible: wizardStepsConfig.activeSteps.includes(step),
      });
    });
    this.observer.subscribe({
      scope: "wizard:commands",
      eventName: WizardEvents.NAVIGATE,
      callback: ({ payload: command }: { payload: WizardCommands }) => {
        const stepName = this.findStep({
          command,
        });
        if (!stepName) {
          return;
        }
        if (stepName) {
          const params = {
            isCompleted: this.stepsMap[this.currentStep].isCompleted,
            state: this.stepsMap[this.currentStep].state,
            prevState: this.stepsMap[this.currentStep].prevState,
            transitionForm: this.currentStep,
            transitionTo: stepName,
          };
          this.observer.dispatch({
            scope: "wizard:commands",
            eventName: WizardEvents.BEFORE_CHANGE_STEP,
            payload: {
              command,
              resolve: () => this.resolveChangeStep(stepName, command),
              reject: (params: { message: string; isError: boolean }) => {
                this.observer.dispatch({
                  scope: "wizard:commands",
                  eventName: WizardEvents.FAIL_CHANGE_STEP,
                  payload: {
                    command,
                    stepName,
                    message: params.message,
                    params,
                  },
                });
              },
              params,
            },
          });
        }
      },
    });
  }
  private resolveChangeStep(stepName: string, command: WizardCommands) {
    this.observer.dispatch({
      scope: "wizard:commands",
      eventName: WizardEvents.LEAVE_STEP,
      payload: {
        command: command,
        params: {
          state: this.stepsMap[this.currentStep].state,
          prevState: this.stepsMap[this.currentStep].prevState,
          isCompleted: this.stepsMap[this.currentStep].isCompleted,
          transitionForm: this.currentStep,
          transitionTo: stepName,
        },
      },
    });
    this.navigate({ stepName });
    this.observer.dispatch({
      scope: "wizard:commands",
      eventName: WizardEvents.CHANGE_STEP,
      payload: {
        stepName: this.currentStep,
      },
    });
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

  setStepState(cb: (state: any) => any) {
    this.stepsMap[this.currentStep].state = {
      ...this.stepsMap[this.currentStep].state,
      ...cb(this.stepsMap[this.currentStep].state),
    };
    this.observer.dispatch({
      scope: "wizard:step",
      eventName: WizardEvents.STEP_STATE_STATE,
      payload: {
        stepName: this.currentStep,
      },
    });
  }
}

export { Wizard };
