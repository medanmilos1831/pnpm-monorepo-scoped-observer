import {
  WIZARD_COMMANDS,
  WIZARD_EVENTS,
  type WizardCommand,
} from "./constants";
import { MiddlewareManager } from "./MiddlewareManager";
import type { Observer } from "./Observer";
import { Step } from "./Step";
import type {
  IStep,
  WizardOptions,
  WizardRoute,
  WizardRouteWithoutValidators,
} from "./types";

class Wizard {
  activeStep: string;
  stepsMap: { [key: string]: IStep } = {};
  isFirst: boolean = false;
  isLast: boolean = false;
  private middlewareManager = new MiddlewareManager();
  private observer: Observer;

  private __INTERNAL__: WizardRouteWithoutValidators[] = [];

  constructor(
    config: WizardRoute[],
    opts: WizardOptions,
    observerInstance: Observer
  ) {
    config.forEach((route) => {
      const { validators, ...rest } = route;
      this.__INTERNAL__.push(structuredClone(rest));
      if (route.visible) {
        this.stepsMap[route.name] = new Step(route);
      }
    });
    this.activeStep = opts.activeStep;
    this.updateNavigationProperties();
    this.observer = observerInstance;
  }
  private updateNavigationProperties() {
    const visibleSteps = Object.keys(this.stepsMap);
    this.isFirst = this.activeStep === visibleSteps[0];
    this.isLast = this.activeStep === visibleSteps[visibleSteps.length - 1];
  }

  private handleNavigationRequest(command: WizardCommand) {
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
    return {
      stepName,
      command,
    };
  }

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
    this.observer.events.dispatch({
      event: WIZARD_EVENTS.STEP_PARAMS_CHANGED,
    });
  };

  private navigateToStep = (command: WizardCommand) => {
    let { stepName, command: cmd } = this.handleNavigationRequest(command);
    if (stepName === null) {
      return;
    }
    this.middlewareManager.execute({
      command: cmd,
      step: this.stepsMap[this.activeStep],
      resolve: () => {
        this.activeStep = stepName;
        this.updateNavigationProperties();
        this.observer.events.dispatch({
          event: WIZARD_EVENTS.STEP_CHANGED,
          payload: { stepName },
        });
      },
      reject: (error?: any) => {
        this.observer.events.dispatch({
          event: WIZARD_EVENTS.STEP_REJECTED,
          payload: error,
        });
      },
    });
  };

  // Navigation methods
  nextStep = () => {
    this.navigateToStep(WIZARD_COMMANDS.NEXT);
  };

  prevStep = () => {
    this.navigateToStep(WIZARD_COMMANDS.PREV);
  };
}

export { Wizard };
