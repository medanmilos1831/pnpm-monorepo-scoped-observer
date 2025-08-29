import { createMachine } from "../scoped-observer-state-machine";
import { WizzardInstance } from "./WizzardInstance";
import { Api } from "./Api";
import { Handlers } from "./Handlers";
import type { IWizzardInstance, WizzardData, WizzardConfig } from "./types";

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
export function createOnChangeObject(instance: IWizzardInstance): WizzardData {
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
export function createWizzardData(instance: IWizzardInstance): WizzardData {
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
export function validateWizzardConfig(
  name: string,
  config: WizzardConfig
): void {
  if (!name || typeof name !== "string") {
    throw new Error("[Wizzard] Name must be a valid string");
  }

  if (!config || typeof config !== "object") {
    throw new Error("[Wizzard] Configuration must be a valid object");
  }

  if (
    !config.stepsConfig ||
    typeof config.stepsConfig !== "object" ||
    Object.keys(config.stepsConfig).length === 0
  ) {
    throw new Error(
      "[Wizzard] Configuration must include non-empty stepsConfig object"
    );
  }

  if (!config.activeStep || typeof config.activeStep !== "string") {
    throw new Error(
      "[Wizzard] Configuration must include valid activeStep string"
    );
  }

  const availableSteps = Object.keys(config.stepsConfig);
  if (!availableSteps.includes(config.activeStep)) {
    throw new Error(
      `[Wizzard] activeStep "${
        config.activeStep
      }" not found in stepsConfig. Available steps: [${availableSteps.join(
        ", "
      )}]`
    );
  }
}

/**
 * Creates state machine transitions for all steps.
 * Each step can transition to any other step directly.
 *
 * @param steps - Array of step names
 * @param activeStep - Active step name
 * @returns Object with transitions for state machine
 */
export function createStateMachineTransitions(
  steps: string[],
  activeStep: string
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
        RESET: activeStep,
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
  instance: WizzardInstance,
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

/**
 * Creates and initializes a wizzard state machine.
 * This centralizes machine creation logic for consistency.
 *
 * @param steps - Array of step names
 * @param activeStep - Active step name
 * @param currentStep - Current step name for machine initialization
 * @returns Configured state machine instance
 */
export function createWizzardMachine(
  steps: string[],
  activeStep: string,
  currentStep: string
) {
  const transitions = createStateMachineTransitions(steps, activeStep);

  return createMachine({
    init: currentStep,
    transition: transitions,
  });
}

/**
 * Initializes a new wizzard instance with API.
 * This centralizes wizzard creation logic for consistency and reusability.
 *
 * @param name - The wizzard name
 * @param config - The wizzard configuration
 * @param handlers - The handlers instance to use
 * @returns Object containing wizzard instance and API
 */
export function initWizzard(
  name: string,
  config: WizzardConfig,
  handlers: Handlers
) {
  const wizzard = new WizzardInstance(name, { ...config });
  const api = new Api(wizzard, handlers);
  return { wizzard, api };
}

/**
 * Creates shared values object used by both WizzardHandler and useWatch.
 * This centralizes shared values logic and ensures consistency.
 *
 * @param item - Object containing wizzard instance and API
 * @returns Object with all shared wizzard values and methods
 */
export function createWizzardSharedValues(item: {
  wizzard: WizzardInstance;
  api: Api;
}) {
  return {
    name: item.wizzard.name,
    currentStep: item.wizzard.currentStep,
    totalSteps: item.wizzard.steps.length,
    activeStep: item.wizzard.activeStep,
    nextStepName: item.wizzard.nextStepName,
    prevStepName: item.wizzard.prevStepName,
    isFirst: item.wizzard.isFirst,
    isLast: item.wizzard.isLast,
    nextStep: () => item.api.nextStep(),
    prevStep: () => item.api.prevStep(),
    goToStep: (step: string) => item.api.goToStep(step),
    reset: () => item.api.reset(),
  };
}
