import {
  createScopedObserver,
  type IScopedObserver,
} from "../scroped-observer";
import { Step } from "./Step";
import type { IStep, WizzardOptions, WizzardRoute } from "./types";
import {
  WIZARD_COMMANDS,
  WIZARD_EVENTS,
  type WizardCommand,
} from "./constants";
import { CommandCenter } from "./CommandCenter";
import { MiddlewareManager } from "./MiddlewareManager";

class Wizard {
  private observer: IScopedObserver = createScopedObserver([
    {
      scope: "wizard",
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
      scope: "wizard",
      eventName: WIZARD_EVENTS.STEP_CHANGING,
      callback: ({ payload }: { payload: { stepName: string } }) => {
        // Step changed
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

  private changeStep({
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
          scope: "wizard",
          eventName: WIZARD_EVENTS.STEP_CHANGING,
          payload: {
            stepName,
            command,
          },
        });
      },
      reject: (obj?: { payload?: any }) => {
        this.observer.dispatch({
          scope: "wizard",
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
    this.changeStep(value);
  };

  activeStepSyncStore = {
    subscribe: () => {
      return this.observer.subscribe({
        scope: "wizard",
        eventName: WIZARD_EVENTS.STEP_CHANGED,
        callback: ({ payload }: { payload: { stepName: string } }) => {
          // Step changed
        },
      });
    },
    getSnapshot: () => this.activeStep,
  };

  rejectSubscription = (cb: (payload: any) => void) => {
    return this.observer.subscribe({
      scope: "wizard",
      eventName: WIZARD_EVENTS.STEP_REJECTED,
      callback: ({ payload }: any) => {
        cb(payload);
      },
    });
  };
}

export { Wizard };
