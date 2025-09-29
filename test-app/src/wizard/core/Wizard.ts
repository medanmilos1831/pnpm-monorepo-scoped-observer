import type { IScopedObserver } from "../../scroped-observer";
import { createScopedObserver } from "../../scroped-observer";
import {
  WizardCommands,
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
  valid: any = true;
  commands: Commands = new Commands(this.observer);
  __INIT_CONFIG__: IWizardConfig;
  __INIT_WIZZARD_STEPS_CONFIG__: IWizardStepsConfig;
  stepsMap: { [key: string]: any } = {};
  wizardStepsConfig: IWizardStepsConfig;
  constructor(config: IWizardConfig, wizardStepsConfig: IWizardStepsConfig) {
    console.log("wizard constructor", config, wizardStepsConfig);
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
      eventName: "stepIntercept",
      callback: ({ payload }: { payload: WizardCommands }) => {
        this.observer.dispatch({
          scope: "wizard:commands",
          eventName: "action",
          payload: {
            command: payload,
          },
        });
      },
    });
    this.observer.subscribe({
      scope: "wizard:commands",
      eventName: "navigate",
      callback: ({ payload: command }: { payload: WizardCommands }) => {
        const value = this.findStep({
          command,
        });
        if (!value) {
          return;
        }
        if (value) {
          this.navigate({ stepName: value });
          this.observer.dispatch({
            scope: "wizard:commands",
            eventName: "changeStep",
            payload: {
              command,
            },
          });
        }
      },
    });
  }
  private findStep({ command }: { command: WizardCommands }): string | null {
    const activeSteps = this.wizardStepsConfig.activeSteps;
    const currentIndex = activeSteps.indexOf(this.currentStep);

    if (command === WizardCommands.NEXT) {
      const nextIndex = currentIndex + 1;
      return nextIndex < activeSteps.length ? activeSteps[nextIndex] : null;
    } else if (command === WizardCommands.PREV) {
      const prevIndex = currentIndex - 1;
      return prevIndex >= 0 ? activeSteps[prevIndex] : null;
    }

    return null;
  }

  private navigate({ stepName }: { stepName: string }) {
    this.currentStep = stepName;
  }
}

export { Wizard };
