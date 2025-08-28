import { createMachine } from "../scoped-observer-state-machine";
import {
  validateWizzardConfig,
  createStateMachineTransitions,
  updateNavigationProperties,
  createOnChangeObject,
} from "./utils";
import type { WizzardConfig, WizzardData } from "./types";

class WizzardInstance {
  name: string;
  machine;
  steps: string[];
  stepsConfig: { [key: string]: { element: React.ComponentType<any> } };
  currentStep: string;
  activeStep: string;
  nextStepName: string;
  prevStepName: string;
  isFirst: boolean;
  isLast: boolean;
  currentStepIndex: number;
  infinite: boolean;
  onChange?: (data: WizzardData) => void;

  /**
   * Creates a new wizzard instance with the specified configuration.
   * @param name - Unique identifier for this wizzard instance
   * @param config - Configuration object containing initial step and step definitions
   * @throws Error if configuration is invalid
   */
  constructor(name: string, config: WizzardConfig) {
    // Use utility function for validation
    validateWizzardConfig(name, config);

    // Initialize basic properties
    this.name = name;
    this.steps = Object.keys(config.steps);
    this.stepsConfig = config.steps;
    this.infinite = config.infinite || false;
    this.onChange = config.onChange;

    // Initialize step state
    this.currentStep = config.initStep;
    this.activeStep = config.initStep;
    this.currentStepIndex = this.steps.indexOf(this.currentStep);

    // Initialize navigation properties
    this.isFirst = this.currentStepIndex === 0;
    this.isLast = this.currentStepIndex === this.steps.length - 1;
    this.nextStepName = this.steps.length > 1 ? this.steps[1] : this.steps[0];
    this.prevStepName = this.steps[0];

    // Use utility function for state machine transitions
    const transitions = createStateMachineTransitions(
      this.steps,
      config.initStep
    );

    // Create and initialize state machine
    this.machine = createMachine({
      init: config.initStep,
      transition: transitions,
    });
  }

  update(name: string, config: WizzardConfig) {
    this.name = name;
    this.steps = Object.keys(config.steps);
    this.stepsConfig = config.steps;
    this.infinite = config.infinite || false;
    this.onChange = config.onChange;

    // Use utility function to update navigation properties
    updateNavigationProperties(this, this.steps.indexOf(config.initStep));

    // Use utility function for state machine transitions
    const transitions = createStateMachineTransitions(
      this.steps,
      config.initStep
    );

    // Create and initialize state machine
    this.machine = createMachine({
      init: this.currentStep,
      transition: transitions,
    });
  }

  /**
   * Advances to the next step in the sequence.
   * Does nothing if already at the last step.
   */
  nextStep(): void {
    let currentIndex = this.steps.indexOf(this.activeStep);
    if (this.isLast) {
      this.currentStepIndex = this.infinite ? 0 : currentIndex;
    } else {
      this.currentStepIndex = currentIndex + 1;
    }

    // Use utility function to update navigation properties
    updateNavigationProperties(this, this.currentStepIndex);

    this.onChange?.(createOnChangeObject(this));
    this.machine.send({ type: "NEXT" });
  }

  /**
   * Goes back to the previous step in the sequence.
   * Does nothing if already at the first step.
   */
  prevStep(): void {
    let currentIndex = 0;
    currentIndex = this.steps.indexOf(this.activeStep);
    if (this.isFirst) {
      this.currentStepIndex = this.infinite
        ? this.steps.length - 1
        : currentIndex;
    } else {
      this.currentStepIndex = currentIndex - 1;
    }

    // Use utility function to update navigation properties
    updateNavigationProperties(this, this.currentStepIndex);

    this.machine.send({ type: "PREV" });
    this.onChange?.(createOnChangeObject(this));
  }

  /**
   * Navigates directly to a specific step.
   * Does nothing if the step does not exist.
   */
  goToStep(step: string): void {
    if (!this.steps.includes(step)) {
      return; // Silent fail - ništa se ne dešava
    }

    const stepIndex = this.steps.indexOf(step);

    // Use utility function to update navigation properties
    updateNavigationProperties(this, stepIndex);

    this.machine.send({ type: this.currentStep, payload: step });
    this.onChange?.(createOnChangeObject(this));
  }

  /**
   * Resets the wizzard to its initial state.
   */
  reset(): void {
    // Use utility function to update navigation properties
    updateNavigationProperties(this, 0);

    this.machine.send({ type: "RESET" });
    this.onChange?.(createOnChangeObject(this));
  }
}
export { WizzardInstance };
