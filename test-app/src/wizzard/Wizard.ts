import type { IScopedObserver } from "../scroped-observer";
import {
  WIZARD_COMMANDS,
  WIZARD_EVENTS,
  WIZARD_SCOPE,
  type WizardCommand,
} from "./constants";
import { MiddlewareManager } from "./MiddlewareManager";
import { Observer } from "./Observer";
import { Step } from "./Step";
import type { IStep, WizzardOptions, WizzardRoute } from "./types";

class Wizard {
  activeStep: string;
  stepsMap: { [key: string]: IStep } = {};
  isFirst: boolean = false;
  isLast: boolean = false;
  observer: Observer;
  private middlewareManager = new MiddlewareManager();

  private __INTERNAL__: any = [];

  constructor(
    config: WizzardRoute[],
    opts: WizzardOptions,
    observer: Observer
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

    this.observer.subscribeNavigation((payload) => {
      let { stepName, command } = this.handleNavigationRequest(payload.command);
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
            eventName: WIZARD_EVENTS.STEP_CHANGED,
            payload: {
              stepName,
            },
          });
        },
        reject: (error?: any) => {
          this.observer.dispatch({
            eventName: WIZARD_EVENTS.STEP_REJECTED,
            payload: error,
          });
        },
      });
    });
  }
  private updateNavigationProperties() {
    const visibleSteps = Object.keys(this.stepsMap);
    this.isFirst = this.activeStep === visibleSteps[0];
    this.isLast = this.activeStep === visibleSteps[visibleSteps.length - 1];
  }

  private handleNavigationRequest(command: WizardCommand) {
    const visibleSteps = this.getVisibleSteps();
    const currentIndex = this.getCurrentIndex();

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

  private getVisibleSteps() {
    return Object.keys(this.stepsMap);
  }

  private getCurrentIndex() {
    return this.getVisibleSteps().indexOf(this.activeStep);
  }
  rejectSubscription = (cb: (payload: any) => void) => {
    // return this.observer.subscribeStepRejected((payload: any) => {
    //   cb(payload);
    // });
  };

  mutateStep = (
    cb: (step: { isCompleted: boolean; isChanged: boolean; state: any }) => {
      isCompleted: boolean;
      isChanged: boolean;
      state: any;
    }
  ) => {
    // const activeStep = this.stepsMap[this.activeStep];
    // let result = cb({
    //   isCompleted: activeStep.isCompleted,
    //   isChanged: activeStep.isChanged,
    //   state: activeStep.state,
    // });
    // this.observer.dispatch({
    //   eventName: WIZARD_EVENTS.STEP_PARAMS_CHANGED,
    //   payload: result,
    // });
  };
}

export { Wizard };
