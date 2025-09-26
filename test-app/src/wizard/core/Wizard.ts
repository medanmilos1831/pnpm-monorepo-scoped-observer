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
  lastEvent: any = null;
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
        // if (
        //   this.valid &&
        //   this.stepsMap[this.currentStep].status ===
        //     StepValidationStatus.INVALID
        // ) {
        //   this.valid = false;
        //   this.observer.dispatch({
        //     scope: "wizard",
        //     eventName: "onFailed",
        //     payload: {
        //       toStep,
        //       command,
        //     },
        //   });
        //   return;
        // }
        console.log("last event", this.lastEvent);
        // Handle navigation command
        this.observer.dispatch({
          scope: "wizard",
          eventName: (() => {
            let event =
              this.stepsMap[this.currentStep].status ===
              StepValidationStatus.INVALID
                ? "onFailed"
                : "onChange";
            return "onChange";
          })(),
          payload: {
            toStep,
            command,
            // resolve: () => {
            //   this.setStepPrevState(command, toStep);
            //   this.navigate(toStep);
            //   // Resolve navigation
            // },
            // reject: () => {
            //   this.setStepStatus(StepValidationStatus.INVALID);
            //   // Reject navigation
            // },
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

  private resetStepsAheadOfCurrentStep() {
    const steps = Object.keys(this.stepsMap);
    const currentIndex = steps.indexOf(this.currentStep);

    // Reset only steps AFTER current step (not including current step)
    for (let i = currentIndex + 1; i < steps.length; i++) {
      const stepName = steps[i];
      const step = this.stepsMap[stepName];

      // Only reset if step is visible and completed
      if (step.visible && step.isCompleted) {
        step.isCompleted = false;
        step.state = undefined;
        step.prevState = undefined;
        step.status = StepValidationStatus.VALID;
      }
    }
  }

  private setStepPrevState(command: string, toStep: string) {
    const key = command === "next" ? this.currentStep : toStep;
    const value =
      command === "next"
        ? undefined
        : structuredClone(this.stepsMap[key].state);
    this.stepsMap[key].prevState = value;
    this.stepsMap[this.currentStep].prevState = value;
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

  private setStepStatus(status: StepValidationStatus) {
    this.stepsMap[this.currentStep].status = status;
    if (status === StepValidationStatus.INVALID) {
      this.valid = false;
    } else {
      this.valid = true;
    }
    this.observer.dispatch({
      scope: "wizard:step",
      eventName: "stepStatusChanged",
      payload: {
        status,
      },
    });
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
        invalidated: () => {
          this.setStepStatus(StepValidationStatus.INVALID);
        },
        validate: () => {
          this.setStepStatus(StepValidationStatus.VALID);
        },
        currentState: this.stepsMap[this.currentStep].state,
        prevState: this.stepsMap[this.currentStep].prevState,
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
        invalidated: () => {
          console.log("INVALIDATED");
          this.setStepStatus(StepValidationStatus.INVALID);
        },
        validate: () => {
          console.log("INVALIDATED");
          this.setStepStatus(StepValidationStatus.VALID);
        },
        currentState: this.stepsMap[this.currentStep].state,
        prevState: this.stepsMap[this.currentStep].prevState,
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
        invalidated: () => {
          this.setStepStatus(StepValidationStatus.INVALID);
        },
        validate: () => {
          this.setStepStatus(StepValidationStatus.VALID);
        },
        currentState: this.stepsMap[this.currentStep].state,
        prevState: this.stepsMap[this.currentStep].prevState,
      },
    });
  };
}

export { Wizard };
