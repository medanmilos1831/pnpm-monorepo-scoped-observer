import {
  createScopedObserver,
  type IScopedObserver,
} from "../scroped-observer";
import { Step } from "./Step";
import { WizardAnalytics } from "./WizardAnalytics";
import { WIZARD_EVENTS, WIZARD_SCOPE, STEP_COMMANDS } from "./constants";
import type { IStep, IWizardConfig } from "./types";

class Wizard {
  name: string;
  observer: IScopedObserver = createScopedObserver([{ scope: WIZARD_SCOPE }]);
  steps: string[];
  activeStep: string;
  activeSteps: string[];
  activeStepsMap: { [key: string]: IStep } = {};
  isFirst: boolean;
  isLast: boolean;
  private analytics = new WizardAnalytics();
  __INIT__: IWizardConfig;
  constructor(config: IWizardConfig) {
    this.name = config.name;
    this.steps = config.steps;
    this.activeStep = config.activeStep;
    this.activeSteps = config.activeSteps;
    this.activeSteps.forEach((step) => {
      this.activeStepsMap[step] = new Step(step);
    });
    this.isFirst = this.isFirstStep();
    this.isLast = this.isLastStep();
    this.__INIT__ = structuredClone(config);
    this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_CHANGE_REQUEST,
      callback: ({ payload }) => {
        const { command, step } = payload;
        if (command === STEP_COMMANDS.NEXT && this.isLast) {
          alert("You are on the last step");
          return;
        }
        if (command === STEP_COMMANDS.PREV && this.isFirst) {
          alert("You are on the first step");
          return;
        }
        this.activeStep = step;
        this.isFirst = this.isFirstStep();
        this.isLast = this.isLastStep();
        this.observer.dispatch({
          scope: WIZARD_SCOPE,
          eventName: WIZARD_EVENTS.STEP_CHANGE,
          payload: this.activeStep,
        });
      },
    });
  }

  private changeStep(command: "nextStep" | "prevStep", step: string) {
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_CHANGE_REQUEST,
      payload: { command, step },
    });
  }

  private isLastStep() {
    return this.steps.indexOf(this.activeStep) === this.steps.length - 1;
  }

  private isFirstStep() {
    return this.steps.indexOf(this.activeStep) === 0;
  }

  nextStep = () => {
    if (!this.analytics.hasValidationFeature()) {
      this.changeStep(
        STEP_COMMANDS.NEXT,
        this.steps[this.steps.indexOf(this.activeStep) + 1]
      );
      return;
    }
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.NEXT_STEP_REQUEST,
      payload: this.activeStep,
    });
  };

  prevStep = () => {
    this.changeStep(
      STEP_COMMANDS.PREV,
      this.steps[this.steps.indexOf(this.activeStep) - 1]
    );
  };

  subscribeToNextStep = ({
    onNextStep,
    onFail,
  }: {
    onNextStep: (step: IStep) => boolean;
    onFail: () => void;
  }) => {
    // Track validation subscription
    this.analytics.trackValidationSubscription();

    const unsubscribe = this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.NEXT_STEP_REQUEST,
      callback: () => {
        const result = onNextStep(this.activeStepsMap[this.activeStep]);
        if (result) {
          // update step history
          const { stepHistory, ...rest } = this.activeStepsMap[this.activeStep];
          this.activeStepsMap[this.activeStep].stepHistory =
            structuredClone(rest);
          // end :: update step history
          this.changeStep(
            STEP_COMMANDS.NEXT,
            this.steps[this.steps.indexOf(this.activeStep) + 1]
          );
        }
        if (!result && onFail) {
          onFail();
        }
      },
    });
    return () => {
      // Track validation unsubscription
      this.analytics.trackValidationUnsubscription();
      return unsubscribe();
    };
  };

  mutateStep = (
    callback: (prev: Omit<IStep, "update" | "stepHistory">) => IStep
  ) => {
    const { stepHistory, ...rest } = this.activeStepsMap[this.activeStep];
    this.activeStepsMap = {
      ...this.activeStepsMap,
      [this.activeStep]: {
        ...this.activeStepsMap[this.activeStep],
        ...callback(rest),
      },
    };
    this.observer.dispatch({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_UPDATE,
      payload: this.activeStep,
    });
  };

  subscribeToStepUpdate = (notify: () => void) => {
    return this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_UPDATE,
      callback: () => {
        notify();
      },
    });
  };
  getCurrentStepData = () => this.activeStepsMap[this.activeStep];

  subscribeToStepChange = (notify: () => void) => {
    return this.observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_CHANGE,
      callback: () => {
        notify();
      },
    });
  };
  getCurrentStep = () => this.activeStep;

  logging = () => {};
}

export { Wizard };
