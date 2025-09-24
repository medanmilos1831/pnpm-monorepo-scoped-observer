import {
  WIZARD_COMMANDS,
  WIZARD_EVENTS,
  WIZARD_SCOPE,
  type WizardCommand,
} from "../types";
import { ValidationEngine } from "./ValidationEngine";
import { Step } from "./Step";
import type {
  clientValidationRejectParams,
  IStep,
  WizardOptions,
  WizardPending,
  WizardRoute,
  WizardRouteWithoutValidators,
  wizzardRejectParamsType,
} from "../types";
import type { IScopedObserver } from "../../scroped-observer";
import { createScopedObserver } from "../../scroped-observer";

class Wizard {
  observer: IScopedObserver = createScopedObserver([
    {
      scope: WIZARD_SCOPE,
    },
  ]);
  activeStep: string;
  stepsMap: { [key: string]: IStep } = {};
  isFirst: boolean = false;
  isLast: boolean = false;
  pending: WizardPending = {
    command: null,
    stepName: null,
  };
  private validationEngine = new ValidationEngine();

  private __INTERNAL__: WizardRouteWithoutValidators[] = [];

  constructor(config: WizardRoute[], opts: WizardOptions) {
    config.forEach((route) => {
      const { validators, ...rest } = route;
      this.__INTERNAL__.push(structuredClone(rest));
      if (route.visible) {
        this.stepsMap[route.name] = new Step(route);
      }
    });
    this.activeStep = opts.activeStep;
    this.syncWizardBoundaries();
  }

  private syncWizardBoundaries() {
    const visibleSteps = Object.keys(this.stepsMap);
    this.isFirst = this.activeStep === visibleSteps[0];
    this.isLast = this.activeStep === visibleSteps[visibleSteps.length - 1];
  }

  private findStep(command: WizardCommand) {
    let visibleSteps = Object.keys(this.stepsMap);
    let currentIndex = visibleSteps.indexOf(this.activeStep);

    let stepName: string | null = null;
    if (command === WIZARD_COMMANDS.NEXT) {
      if (currentIndex < visibleSteps.length - 1) {
        stepName = visibleSteps[currentIndex + 1];
      }
    } else if (command === WIZARD_COMMANDS.PREV) {
      if (currentIndex > 0) {
        stepName = visibleSteps[currentIndex - 1];
      }
    }
    return stepName;
  }

  private setStepHistory = (value: any) => {
    this.stepsMap[this.activeStep].stepHistory = structuredClone(value);
  };

  private resolve = (stepName: string, command: WizardCommand) => {
    this.activeStep = stepName;

    // ===== STEP HISTORY MANAGEMENT =====
    // Handle step history based on navigation direction
    // NEXT: Clear history (moving forward, no need to preserve previous state)
    // PREV: Save current state to history (for potential rollback)
    command === WIZARD_COMMANDS.NEXT
      ? this.setStepHistory(null)
      : this.setStepHistory(this.stepsMap[this.activeStep].state);
    // ===== END STEP HISTORY MANAGEMENT =====
    this.syncWizardBoundaries();
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_CHANGED,
    });
    this.setPending(null, null);
  };

  private reject = ({
    errorMessage,
    command,
    stepName,
  }: wizzardRejectParamsType) => {
    this.setPending(command, stepName);
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_REJECTED,
      payload: errorMessage,
    });
  };

  private setPending = (
    command: WizardCommand | null,
    stepName: string | null
  ) => {
    this.pending.command = command;
    this.pending.stepName = stepName;
  };

  private navigate = (command: WizardCommand) => {
    let stepName = this.findStep(command);
    if (stepName === null) {
      return;
    }
    this.validationEngine.execute({
      command: command,
      step: this.stepsMap[this.activeStep],
      resolve: () => {
        this.resolve(stepName, command);
      },
      reject: (error?: clientValidationRejectParams) => {
        this.reject({
          errorMessage: error?.message || "Rejected",
          command,
          stepName,
        });
      },
    });
  };

  getState = () => {
    const { validators, ...step } = this.stepsMap[this.activeStep!];
    return {
      isFirst: this.isFirst,
      isLast: this.isLast,
      activeStep: this.activeStep,
      step,
    };
  };

  mutateStep = (
    cb: (step: { isCompleted: boolean; isChanged: boolean; state: any }) => {
      isCompleted: boolean;
      isChanged: boolean;
      state: any;
    }
  ) => {
    const activeStep = this.stepsMap[this.activeStep];
    this.stepsMap[this.activeStep] = {
      ...this.stepsMap[this.activeStep],
      ...cb({
        isCompleted: activeStep.isCompleted,
        isChanged: activeStep.isChanged,
        state: activeStep.state,
      }),
    };
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_PARAMS_CHANGED,
    });
  };

  nextStep = () => {
    if (this.pending.command === WIZARD_COMMANDS.NEXT) {
      this.resolve(this.pending.stepName!, WIZARD_COMMANDS.NEXT);
      return;
    }
    this.navigate(WIZARD_COMMANDS.NEXT);
  };

  prevStep = () => {
    this.navigate(WIZARD_COMMANDS.PREV);
  };
}

export { Wizard };
