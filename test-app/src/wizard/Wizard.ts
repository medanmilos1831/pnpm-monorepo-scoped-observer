import {
  WIZARD_COMMANDS,
  WIZARD_EVENTS,
  type WizardCommand,
} from "./constants";
import { Events } from "./Events";
import { MiddlewareManager } from "./MiddlewareManager";
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
  private events: Events;

  private __INTERNAL__: WizardRouteWithoutValidators[] = [];

  constructor(
    config: WizardRoute[],
    opts: WizardOptions,
    eventsInstance: Events
  ) {
    config.forEach((route) => {
      const { validators, ...rest } = route;
      this.__INTERNAL__.push(structuredClone(rest));
      if (route.visible) {
        this.stepsMap[route.name] = new Step(route);
      }
    });
    this.activeStep = opts.activeStep;
    this.syncWizardBoundaries();
    this.events = eventsInstance;
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
    this.events.dispatch({
      event: WIZARD_EVENTS.STEP_CHANGED,
      payload: { stepName },
    });
  };

  private reject = (error?: any) => {
    this.events.dispatch({
      event: WIZARD_EVENTS.STEP_REJECTED,
      payload: error,
    });
  };

  private navigate = (command: WizardCommand) => {
    let stepName = this.findStep(command);
    if (stepName === null) {
      return;
    }
    this.middlewareManager.execute({
      command: command,
      step: this.stepsMap[this.activeStep],
      resolve: () => this.resolve(stepName),
      reject: this.reject,
    });
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
    this.events.dispatch({
      event: WIZARD_EVENTS.STEP_PARAMS_CHANGED,
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
