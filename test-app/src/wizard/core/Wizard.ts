import type { IScopedObserver } from "../../scroped-observer";
import { createScopedObserver } from "../../scroped-observer";
import {
  WizardStepLifecycle,
  WizardCommands,
  type IWizardConfig,
  type IWizardStepsConfig,
  StepValidationStatus,
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
        this.setStepPrevState(command, toStep);
        this.observer.dispatch({
          scope: "wizard",
          eventName: "onNavigate",
          payload: {
            toStep,
            command,
            currentState: this.stepsMap[this.currentStep].state,
            prevState: this.stepsMap[this.currentStep].prevState,
            status: this.stepsMap[this.currentStep].status,
            action:
              this.stepsMap[this.currentStep].status ===
              StepValidationStatus.INVALID
                ? "onFailed"
                : "onChange",
          },
        });
      },
    });
  }

  private setStepPrevState(command: string, toStep: string) {
    const key = command === "next" ? this.currentStep : toStep;
    const value =
      command === "next"
        ? undefined
        : structuredClone(this.stepsMap[key].state);
    this.stepsMap[key].prevState = value;
  }

  private findNextStep(command: WizardCommands) {
    let toStep = undefined;
    const steps = Object.keys(this.stepsMap);
    const currentIndex = steps.indexOf(this.currentStep);

    if (command === WizardCommands.NEXT) {
      const nextIndex = currentIndex + 1;
      const nextStepName =
        nextIndex < steps.length ? steps[nextIndex] : undefined;
      toStep = nextStepName;
    } else if (command === WizardCommands.PREV) {
      const prevIndex = currentIndex - 1;
      const prevStepName = prevIndex >= 0 ? steps[prevIndex] : undefined;
      toStep = prevStepName;
    }
    return toStep;
  }

  private navigate(toStep: string) {
    this.currentStep = toStep;
    this.observer.dispatch({
      scope: "wizard",
      eventName: "changeStep",
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
        currentState: this.stepsMap[this.currentStep].state,
        prevState: this.stepsMap[this.currentStep].prevState,
        ruleCallback: ({ rule, value }: { rule: string; value: boolean }) => {
          this.stepsMap[this.currentStep][rule] = (() => {
            if (rule === "status") {
              return value
                ? StepValidationStatus.VALID
                : StepValidationStatus.INVALID;
            } else {
              return value;
            }
          })();
          this.observer.dispatch({
            scope: "wizard:step",
            eventName:
              rule === "status" ? "stepStatusChanged" : "stepCompletionChanged",
          });
        },
      },
    });
  };
}

export { Wizard };
