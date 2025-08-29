import {
  createOnChangeObject,
  updateNavigationProperties,
  createWizzardMachine,
} from "./utils";
import type { IWizzardInstance, WizzardConfig } from "./types";

/**
 * Base class containing handler methods for wizzard navigation.
 * This class handles all the action logic while keeping state management separate.
 */
export class Handlers {
  /**
   * Advances to the next step in the sequence.
   * Does nothing if already at the last step.
   */
  nextStep(this: IWizzardInstance): void {
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
  prevStep(this: IWizzardInstance): void {
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
  goToStep(this: IWizzardInstance, step: string): void {
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
  reset(this: IWizzardInstance): void {
    // Use utility function to update navigation properties
    updateNavigationProperties(this, 0);

    this.machine.send({ type: "RESET" });
    this.onChange?.(createOnChangeObject(this));
  }

  /**
   * Updates the wizzard configuration and reinitializes the state machine.
   * This method allows dynamic updates to wizzard configuration.
   */
  update(this: IWizzardInstance, name: string, config: WizzardConfig): void {
    this.name = name;
    this.steps = Object.keys(config.stepsConfig);
    this.stepsConfig = config.stepsConfig;
    this.infinite = config.infinite || false;
    this.onChange = config.onChange;

    // Use utility function to update navigation properties
    updateNavigationProperties(this, this.steps.indexOf(config.activeStep));

    // Create and initialize state machine using utility function
    this.machine = createWizzardMachine(
      this.steps,
      config.activeStep,
      this.currentStep
    );
  }
}
