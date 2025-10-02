import type { IScopedObserver } from "../../scroped-observer";
import { createScopedObserver } from "../../scroped-observer";
import {
  WizardCommands,
  WizardEvents,
  WIZARD_SCOPE,
  WizardStatus,
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
    },
  ]);

  events: Events = new Events(this.observer);
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
    this.updateNavigationProperties();
    this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WizardEvents.NAVIGATE,
      callback: ({ payload }: { payload: INavigateEventPayload }) => {
        const { command, actionMeta } = payload;
        const stepName = this.findStep({
          command,
        });
        if (!stepName) {
          this.events.internal.onFinish({
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
            success: () => {
              this.setStatus(WizardStatus.SUCCESS);
            },
          });
          return;
        }
        if (stepName) {
          const obj = {
            command,
            resolve: this.resolve(stepName),
            reject: this.reject(stepName, command),
            params: this.transitionParams(stepName),
            actionMeta,
          };
          command === WizardCommands.NEXT
            ? this.events.internal.onNext(obj)
            : this.events.internal.onPrev(obj);
        }
      },
    });
    this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WizardEvents.RESET,
      callback: this.reset,
    });

    this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WizardEvents.NAVIGATE_TO_STEP,
      callback: ({ payload }: { payload: string }) => {
        this.resolve(payload)();
      },
    });
  }

  private setStatus = (status: WizardStatus) => {
    this.status = status;
    this.events.internal.setStatus();
  };

  private reset = () => {
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

  private updateNavigationProperties() {
    this.isLast =
      this.getCurrentIndex() === this.wizardStepsConfig.activeSteps.length - 1;
    this.isFirst = this.getCurrentIndex() === 0;
  }

  private updateSteps = (
    callback: () => string[],
    {
      command,
      actionMeta,
      params,
    }: { command: WizardCommands; actionMeta: IMeta; params: ITransitionParams }
  ) => {
    const value = [...callback()];
    return () => {
      this.wizardStepsConfig.activeSteps = value;
      this.wizardStepsConfig.activeSteps.forEach((step) => {
        this.stepsMap[step] = new Step(step);
      });
      this.events.internal.updateSteps();

      command === WizardCommands.NEXT
        ? this.events.next(actionMeta)
        : this.events.prev(actionMeta);
    };
  };

  private resolve(stepName: string) {
    return () => {
      this.navigate({ stepName });
      this.updateNavigationProperties();
      this.events.internal.changeStep();
    };
  }

  private reject(stepName: string, command: WizardCommands) {
    return (error: IRejectParams) => {
      this.events.internal.failChangeStep({
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
