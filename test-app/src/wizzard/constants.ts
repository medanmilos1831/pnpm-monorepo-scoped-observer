export const WIZARD_EVENTS = {
  STEP_CHANGING: "stepChanging",
  STEP_CHANGED: "stepChanged",
  STEP_REJECTED: "stepRejected",
} as const;

export const WIZARD_COMMANDS = {
  NEXT: "next",
  PREV: "prev",
} as const;

export type WizardEvent = (typeof WIZARD_EVENTS)[keyof typeof WIZARD_EVENTS];
export type WizardCommand =
  (typeof WIZARD_COMMANDS)[keyof typeof WIZARD_COMMANDS];
