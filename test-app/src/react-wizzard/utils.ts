import type { WizzardInstanceInterface, WizzardData } from "./types";

/**
 * Utility functions for react-wizzard package.
 * Contains reusable methods for common operations.
 */

/**
 * Creates the onChange object by extracting relevant properties from a wizzard instance.
 * This is used consistently across WizzardHandler, useWatch, and other components.
 *
 * @param instance - The wizzard instance to extract properties from
 * @returns Object containing wizzard data for onChange callbacks
 */
export function createOnChangeObject(
  instance: WizzardInstanceInterface
): WizzardData {
  const { machine, onChange, ...rest } = instance;
  return rest as WizzardData;
}

/**
 * Creates a wizzard data object with all necessary properties.
 * This ensures consistency across different parts of the system.
 *
 * @param instance - The wizzard instance to create data from
 * @returns Formatted wizzard data object
 */
export function createWizzardData(
  instance: WizzardInstanceInterface
): WizzardData {
  return {
    name: instance.name,
    steps: instance.steps,
    stepsConfig: instance.stepsConfig,
    currentStep: instance.currentStep,
    activeStep: instance.activeStep,
    nextStepName: instance.nextStepName,
    prevStepName: instance.prevStepName,
    isFirst: instance.isFirst,
    isLast: instance.isLast,
    currentStepIndex: instance.currentStepIndex,
    infinite: instance.infinite,
  };
}

/**
 * Validates wizzard configuration to ensure it's valid.
 * Throws descriptive errors for invalid configurations.
 *
 * @param name - The wizzard name
 * @param config - The configuration object
 * @throws Error if configuration is invalid
 */
export function validateWizzardConfig(name: string, config: any): void {
  if (!name || typeof name !== "string") {
    throw new Error("[Wizzard] Name must be a valid string");
  }

  if (!config || typeof config !== "object") {
    throw new Error("[Wizzard] Configuration must be a valid object");
  }

  if (
    !config.steps ||
    typeof config.steps !== "object" ||
    Object.keys(config.steps).length === 0
  ) {
    throw new Error(
      "[Wizzard] Configuration must include non-empty steps object"
    );
  }

  if (!config.initStep || typeof config.initStep !== "string") {
    throw new Error(
      "[Wizzard] Configuration must include valid initStep string"
    );
  }

  const availableSteps = Object.keys(config.steps);
  if (!availableSteps.includes(config.initStep)) {
    throw new Error(
      `[Wizzard] initStep "${
        config.initStep
      }" not found in steps. Available steps: [${availableSteps.join(", ")}]`
    );
  }
}

/**
 * Creates state machine transitions for all steps.
 * Each step can transition to any other step directly.
 *
 * @param steps - Array of step names
 * @param initStep - Initial step name
 * @returns Object with transitions for state machine
 */
export function createStateMachineTransitions(
  steps: string[],
  initStep: string
) {
  const transitions: any = {};

  steps.forEach((step, index) => {
    // Create direct transitions to all steps
    const directTransitions: any = {};
    steps.forEach((targetStep) => {
      directTransitions[targetStep] = targetStep;
    });

    transitions[step] = {
      on: {
        NEXT: index < steps.length - 1 ? steps[index + 1] : steps[0],
        PREV: index > 0 ? steps[index - 1] : steps[steps.length - 1],
        ...directTransitions,
        RESET: initStep,
      },
    };
  });

  return transitions;
}

/**
 * Updates navigation properties based on current step index.
 * This ensures all navigation properties are consistent.
 *
 * @param instance - The wizzard instance to update
 * @param stepIndex - The new step index
 */
export function updateNavigationProperties(
  instance: WizzardInstanceInterface,
  stepIndex: number
): void {
  instance.currentStepIndex = stepIndex;
  instance.activeStep = instance.steps[stepIndex];
  instance.currentStep = instance.steps[stepIndex];

  instance.isFirst = stepIndex === 0;
  instance.isLast = stepIndex === instance.steps.length - 1;

  instance.nextStepName = instance.isLast
    ? instance.activeStep
    : instance.steps[stepIndex + 1];

  instance.prevStepName = instance.isFirst
    ? instance.activeStep
    : instance.steps[stepIndex - 1];
}
