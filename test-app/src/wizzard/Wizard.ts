import {
  createScopedObserver,
  type IScopedObserver,
} from "../scroped-observer";
import { CommandCenter } from "./CommandCenter";
import { WIZARD_EVENTS, WIZARD_SCOPE, type WizardCommand } from "./constants";
import { MiddlewareManager } from "./MiddlewareManager";
import { Step } from "./Step";
import type { IStep, WizzardOptions, WizzardRoute } from "./types";

class Wizard {
  private observer: IScopedObserver = createScopedObserver([
    {
      scope: WIZARD_SCOPE,
      subScopes: [],
      log: false,
    },
  ]);
  activeStep: string;
  stepsMap: { [key: string]: IStep } = {};
  isFirst: boolean = false;
  isLast: boolean = false;
  private commandCenter = new CommandCenter();
  private middlewareManager = new MiddlewareManager();

  private __INTERNAL__: any = [];

  constructor(config: WizzardRoute[], opts: WizzardOptions) {
    config.forEach((route) => {
      const { validators, ...rest } = route;
      this.__INTERNAL__.push(structuredClone(rest));
      if (route.visible) {
        this.stepsMap[route.name] = new Step(route);
      }
    });
    this.activeStep = opts.activeStep;
    this.updateNavigationProperties();
    this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_CHANGING,
      callback: ({
        payload,
      }: {
        payload: { stepName: string; command: WizardCommand };
      }) => {
        this.activeStep = payload.stepName;
        this.updateNavigationProperties();

        this.observer.dispatch({
          scope: WIZARD_SCOPE,
          eventName: WIZARD_EVENTS.STEP_CHANGED,
          payload: {
            stepName: payload.stepName,
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

  private getVisibleSteps() {
    return Object.keys(this.stepsMap);
  }

  private getCurrentIndex() {
    return this.getVisibleSteps().indexOf(this.activeStep);
  }

  private executeStepTransition({
    command,
    stepName,
  }: {
    command: WizardCommand;
    stepName: string | null;
  }) {
    if (stepName === null) {
      return;
    }
    this.middlewareManager.execute({
      command,
      step: this.stepsMap[this.activeStep],
      resolve: () => {
        this.observer.dispatch({
          scope: WIZARD_SCOPE,
          eventName: WIZARD_EVENTS.STEP_CHANGING,
          payload: {
            stepName,
            command,
          },
        });
      },
      reject: (obj?: { payload?: any }) => {
        this.observer.dispatch({
          scope: WIZARD_SCOPE,
          eventName: WIZARD_EVENTS.STEP_REJECTED,
          payload: obj,
        });
      },
    });
  }

  command = (command: WizardCommand) => {
    const visibleSteps = this.getVisibleSteps();
    const currentIndex = this.getCurrentIndex();
    const value = this.commandCenter.navigator(command, {
      visibleSteps,
      currentIndex,
    });
    this.executeStepTransition(value);
  };

  activeStepSyncStore = {
    subscribe: (notify: () => void) => {
      return this.observer.subscribe({
        scope: WIZARD_SCOPE,
        eventName: WIZARD_EVENTS.STEP_CHANGED,
        callback: ({ payload }: { payload: { stepName: string } }) => {
          console.log("activeStepSyncStore", payload);
          notify();
          // Step changed
        },
      });
    },
    getSnapshot: () => this.activeStep,
  };

  stepParamsSyncStore = {
    subscribe: (notify: () => void) => {
      return this.observer.subscribe({
        scope: WIZARD_SCOPE,
        eventName: WIZARD_EVENTS.STEP_PARAMS_CHANGED,
        callback: ({
          payload,
        }: {
          payload: { isCompleted: boolean; isChanged: boolean; state: any };
        }) => {
          this.stepsMap[this.activeStep] = {
            ...this.stepsMap[this.activeStep],
            ...payload,
          };
          notify();
        },
      });
    },
    getSnapshot: () => this.stepsMap[this.activeStep],
  };

  rejectSubscription = (cb: (payload: any) => void) => {
    return this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_REJECTED,
      callback: ({ payload }: any) => {
        cb(payload);
      },
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
    let result = cb({
      isCompleted: activeStep.isCompleted,
      isChanged: activeStep.isChanged,
      state: activeStep.state,
    });
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_PARAMS_CHANGED,
      payload: result,
    });
  };
}

export { Wizard };
