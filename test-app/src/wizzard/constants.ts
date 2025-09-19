// Wizard Event Constants
export const WIZARD_EVENTS = {
  // Step navigation events
  STEP_CHANGE: "stepChanged",
  STEP_UPDATE: "stepUpdated",

  // Step request events
  NEXT_STEP_REQUEST: "nextStepRequest",
  STEP_CHANGE_REQUEST: "onStepChange",
} as const;

// Wizard Scope
export const WIZARD_SCOPE = "wizard" as const;

// Step Commands
export const STEP_COMMANDS = {
  NEXT: "nextStep",
  PREV: "prevStep",
} as const;

// Type definitions for better type safety
export type WizardEvent = (typeof WIZARD_EVENTS)[keyof typeof WIZARD_EVENTS];
export type StepCommand = (typeof STEP_COMMANDS)[keyof typeof STEP_COMMANDS];
