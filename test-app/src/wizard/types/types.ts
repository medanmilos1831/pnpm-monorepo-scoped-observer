export enum WizardCommands {
  NEXT = "next",
  PREV = "prev",
}

export enum StepCommands {
  SUBMIT = "submit",
}

export const WizardEvents = {
  STEP_INTERCEPT: "stepIntercept",
  NAVIGATE: "navigate",
  ACTION: "action",
  CHANGE_STEP: "changeStep",
} as const;

export type WizardEvent = (typeof WizardEvents)[keyof typeof WizardEvents];

export interface IWizardConfig {
  activeStep: string;
}

export interface IWizardStepsConfig {
  steps: string[];
  activeSteps: string[];
}
