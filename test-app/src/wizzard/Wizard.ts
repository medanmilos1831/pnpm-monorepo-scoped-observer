import {
  WIZARD_COMMANDS,
  WIZARD_EVENTS,
  type WizardCommand,
} from "./constants";
import { MiddlewareManager } from "./MiddlewareManager";
import { Observer } from "./Observer";
import { Step } from "./Step";
import type { IStep, WizzardOptions, WizzardRoute } from "./types";

class Wizard {
  private observer = new Observer();
  activeStep: string;
  stepsMap: { [key: string]: IStep } = {};
  isFirst: boolean = false;
  isLast: boolean = false;
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
    this.observer.subscribeStepChanging((payload) => {
      this.activeStep = payload.stepName;
      this.updateNavigationProperties();
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
      resolve: this.observer.resolveDispatch({ stepName, command }),
      reject: this.observer.rejectDispatch,
    });
  }

  private nextStep = (visibleSteps: string[], currentIndex: number) => {
    if (currentIndex === -1 || currentIndex === visibleSteps.length - 1) {
      return null;
    }

    const nextStepName = visibleSteps[currentIndex + 1];
    return nextStepName;
  };

  private prevStep = (visibleSteps: string[], currentIndex: number) => {
    if (currentIndex === -1 || currentIndex === 0) {
      return null;
    }

    const prevStepName = visibleSteps[currentIndex - 1];
    return prevStepName;
  };
  navigator = (command: WizardCommand) => {
    const visibleSteps = this.getVisibleSteps();
    const currentIndex = this.getCurrentIndex();
    let stepName: string | null = null;
    if (command === WIZARD_COMMANDS.NEXT) {
      stepName = this.nextStep(visibleSteps, currentIndex);
    } else {
      stepName = this.prevStep(visibleSteps, currentIndex);
    }
    this.executeStepTransition({ command, stepName });
  };

  activeStepSyncStore = {
    subscribe: this.observer.subscribeActiveStepSyncStore,
    getSnapshot: () => this.activeStep,
  };

  stepParamsSyncStore = {
    subscribe: this.observer.subscribeStepParamsSyncStore((payload: any) => {
      this.stepsMap[this.activeStep] = {
        ...this.stepsMap[this.activeStep],
        ...payload,
      };
    }),
    getSnapshot: () => this.stepsMap[this.activeStep],
  };

  rejectSubscription = (cb: (payload: any) => void) => {
    return this.observer.subscribeStepRejected((payload: any) => {
      cb(payload);
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
      eventName: WIZARD_EVENTS.STEP_PARAMS_CHANGED,
      payload: result,
    });
  };
}

export { Wizard };
