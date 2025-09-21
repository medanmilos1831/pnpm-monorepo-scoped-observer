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
  commandCenter = new CommandCenter();
  middlewareManager = new MiddlewareManager();

  private __INTERNAL__: any = [];
  private __INTERNAL_OPTIONS__: any = {};
  private __INTERNAL_HANDLERS__: any = {};

  constructor(config: WizzardRoute[], opts: WizzardOptions) {
    config.forEach((route) => {
      const { validators, ...rest } = route;
      this.__INTERNAL__.push(structuredClone(rest));
      this.middlewareManager.add(route.name, validators);
      if (route.visible) {
        this.stepsMap[route.name] = new Step(route.name);
      }
    });
    this.__INTERNAL_OPTIONS__ = structuredClone(opts);
    this.activeStep = opts.activeStep;
    this.updateNavigationProperties();
    this.observer.subscribe({
      scope: "wizard",
      eventName: WIZARD_EVENTS.STEP_CHANGING,
      callback: ({ payload }: { payload: { stepName: string } }) => {
        console.log("stepChanged", payload);
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
    const response = this.middlewareManager.execute({
      command,
      step: this.stepsMap[this.activeStep],
      resolve: () => {
        console.log("resolve");
      },
      reject: () => {
        console.log("reject");
      },
    });
    if (response === false) {
      return;
    }
    this.observer.dispatch({
      scope: "wizard",
      eventName: WIZARD_EVENTS.STEP_CHANGING,
      payload: {
        stepName,
        command,
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
}

export { Wizard };
