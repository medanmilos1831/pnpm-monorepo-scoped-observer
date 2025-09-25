import type { IScopedObserver } from "../../scroped-observer";
import { createScopedObserver } from "../../scroped-observer";
import {
  WizardStepLifecycle,
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
  constructor(config: IWizardConfig, wizardStepsConfig: IWizardStepsConfig) {
    this.__INIT_CONFIG__ = structuredClone(config);
    this.__INIT_WIZZARD_STEPS_CONFIG__ = structuredClone(wizardStepsConfig);
    this.currentStep = config.activeStep;
    wizardStepsConfig.steps.forEach((step) => {
      this.stepsMap[step] = new Step(step, {
        visible: wizardStepsConfig.activeSteps.includes(step),
      });
    });
    this.observer.subscribe({
      scope: "wizard:commands",
      eventName: "navigate",
      callback: ({ payload: command }: { payload: any }) => {
        const toStep = this.findNextStep(command);
        if (!toStep) {
          return;
        }
        this.observer.dispatch({
          scope: "wizard:step",
          eventName: "navigate",
          payload: {
            toStep,
            command,
            resolve: () => {
              this.navigate(toStep);
              // Resolve navigation
            },
            reject: () => {
              // Reject navigation
            },
          },
        });
      },
    });
    this.observer.dispatch({
      scope: "wizard:step",
      eventName: `onEnter:${this.currentStep}`,
      payload: {
        completed: () => {
          this.setStepCompleted(true);
        },
        uncompleted: () => {
          this.setStepCompleted(false);
        },
      },
    });
  }

  private setStepCompleted(value: boolean) {
    this.stepsMap[this.currentStep].isCompleted = value;
    this.observer.dispatch({
      scope: "wizard:step",
      eventName: "stepCompletionChanged",
      payload: {
        value,
      },
    });
  }

  private findNextStep(command: string) {
    let toStep = undefined;
    const steps = Object.keys(this.stepsMap);
    const currentIndex = steps.indexOf(this.currentStep);

    if (command === "next") {
      const nextIndex = currentIndex + 1;
      const nextStepName =
        nextIndex < steps.length ? steps[nextIndex] : undefined;
      toStep = nextStepName;
    } else if (command === "prev") {
      const prevIndex = currentIndex - 1;
      const prevStepName = prevIndex >= 0 ? steps[prevIndex] : undefined;
      toStep = prevStepName;
    }
    return toStep;
  }

  private navigate(toStep: string) {
    this.observer.dispatch({
      scope: "wizard:step",
      eventName: `onStepTransition:${this.currentStep}`,
      payload: {
        lifecycle: WizardStepLifecycle.LEAVE,
        completed: () => {
          this.setStepCompleted(true);
        },
        uncompleted: () => {
          this.setStepCompleted(false);
        },
      },
    });
    this.currentStep = toStep;
    this.observer.dispatch({
      scope: "wizard",
      eventName: "changeStep",
    });
    this.observer.dispatch({
      scope: "wizard:step",
      eventName: `onStepTransition:${toStep}`,
      payload: {
        lifecycle: WizardStepLifecycle.ENTER,
        completed: () => {
          this.setStepCompleted(true);
        },
        uncompleted: () => {
          this.setStepCompleted(false);
        },
      },
    });
  }

  mutateStepState = (callback: (step: Step) => void) => {
    this.stepsMap[this.currentStep].state = callback(
      this.stepsMap[this.currentStep].state
    );
    this.observer.dispatch({
      scope: "wizard:step",
      eventName: "mutateStepState",
      payload: {
        completed: () => {
          this.setStepCompleted(true);
        },
        uncompleted: () => {
          this.setStepCompleted(false);
        },
      },
    });
  };
}

export { Wizard };
