import type { IScopedObserver } from "../../scroped-observer";
import { createScopedObserver } from "../../scroped-observer";
import {
  WizardCommands,
  WizardEvents,
  WizardScopes,
  type IMeta,
  type INavigateEventPayload,
  type IRejectParams,
  type ITransitionParams,
  type IWizardConfig,
  type IWizardStepsConfig,
} from "../types";
import { Events } from "./Events";
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

  events: Events = new Events(this.observer);
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
      scope: WizardScopes.COMMANDS,
      eventName: WizardEvents.NAVIGATE,
      callback: ({ payload }: { payload: INavigateEventPayload }) => {
        const { command, actionMeta } = payload;
        const stepName = this.findStep({
          command,
        });
        if (!stepName) {
          this.events.onFinish({
            command,
            actionMeta,
            params: this.transitionParams(this.currentStep),
            reset: this.reset,
            updateSteps: (callback: any) =>
              this.updateSteps(callback, {
                command,
                actionMeta,
                params: this.transitionParams(this.currentStep),
              }),
          });
          return;
        }
        if (stepName) {
          this.events.beforeChangeStep({
            command,
            resolve: this.resolve(stepName),
            reject: this.reject(stepName, command),
            params: this.transitionParams(stepName),
            actionMeta,
          });
        }
      },
    });
  }

  private updateSteps = (
    callback: () => string[],
    {
      command,
      actionMeta,
      params,
    }: { command: WizardCommands; actionMeta: IMeta; params: ITransitionParams }
  ) => {
    return () => {
      this.wizardStepsConfig.activeSteps = [...callback()];
      this.events.updateSteps();
      command === WizardCommands.NEXT
        ? this.events.next(actionMeta)
        : this.events.prev(actionMeta);
    };
  };

  private reset() {
    console.log("RESET", this);
  }
  private resolve(stepName: string) {
    return () => {
      this.navigate({ stepName });
      this.events.changeStep();
    };
  }
  private reject(stepName: string, command: WizardCommands) {
    return (error: IRejectParams) => {
      this.events.failChangeStep({
        command,
        message: error.message,
        params: this.transitionParams(stepName),
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

export { Wizard };
