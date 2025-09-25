import type { IScopedObserver } from "../../scroped-observer";
import { createScopedObserver } from "../../scroped-observer";
import type { IWizardConfig, IWizardStepsConfig } from "../types";
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
    this.stepsMap[this.currentStep].isCompleted = true;
    this.currentStep = toStep;
    this.observer.dispatch({
      scope: "wizard",
      eventName: "changeStep",
    });
  }
}

export { Wizard };
