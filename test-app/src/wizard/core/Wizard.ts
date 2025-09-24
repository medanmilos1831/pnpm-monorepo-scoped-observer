import {
  WIZARD_COMMANDS,
  WIZARD_EVENTS,
  WIZARD_SCOPE,
  type WizardCommand,
} from "../types";
import { ValidationEngine } from "./ValidationEngine";
import { Step } from "./Step";
import type {
  IStep,
  WizardOptions,
  WizardRoute,
  WizardRouteWithoutValidators,
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

  private resolve = (stepName: string) => {
    this.activeStep = stepName;
    this.syncWizardBoundaries();
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_CHANGED,
      payload: { stepName },
    });
  };

  private reject = (error?: any) => {
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_REJECTED,
      payload: error,
    });
  };

  private navigate = (command: WizardCommand) => {
    let stepName = this.findStep(command);
    if (stepName === null) {
      return;
    }
    this.validationEngine.execute({
      command: command,
      step: this.stepsMap[this.activeStep],
      resolve: () => this.resolve(stepName),
      reject: this.reject,
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
    this.navigate(WIZARD_COMMANDS.NEXT);
  };

  prevStep = () => {
    this.navigate(WIZARD_COMMANDS.PREV);
  };
}

export { Wizard };
