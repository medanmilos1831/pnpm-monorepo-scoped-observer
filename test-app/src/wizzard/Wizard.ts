import type { IScopedObserver } from "../scroped-observer";
import {
  WIZARD_COMMANDS,
  WIZARD_EVENTS,
  WIZARD_SCOPE,
  type WizardCommand,
} from "./constants";
import { MiddlewareManager } from "./MiddlewareManager";
import { Step } from "./Step";
import type { IStep, WizzardOptions, WizzardRoute } from "./types";

class Wizard {
  activeStep: string;
  stepsMap: { [key: string]: IStep } = {};
  isFirst: boolean = false;
  isLast: boolean = false;
  observer: IScopedObserver;
  private middlewareManager = new MiddlewareManager();

  private __INTERNAL__: any = [];

  constructor(
    config: WizzardRoute[],
    opts: WizzardOptions,
    observer: IScopedObserver
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
    this.observer = observer;

    this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.NAVIGATION_REQUESTED,
      callback: ({ payload }) => {
        let { stepName, command } = this.handleNavigationRequest(
          payload.command
        );
        if (stepName === null) {
          return;
        }
        this.middlewareManager.execute({
          command: command,
          step: this.stepsMap[this.activeStep],
          resolve: () => {
            this.activeStep = stepName;
            this.updateNavigationProperties();
            this.observer.dispatch({
              scope: WIZARD_SCOPE,
              eventName: WIZARD_EVENTS.STEP_CHANGED,
              payload: {
                stepName,
              },
            });
          },
          reject: (error?: any) => {
            this.observer.dispatch({
              scope: WIZARD_SCOPE,
              eventName: WIZARD_EVENTS.STEP_REJECTED,
              payload: error,
            });
          },
        });
      },
    });
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
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_PARAMS_CHANGED,
    });
  };
}

export { Wizard };
