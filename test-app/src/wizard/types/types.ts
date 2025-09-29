export enum WizardCommands {
  NEXT = "next",
  PREV = "prev",
}

export interface IWizardConfig {
  activeStep: string;
}

export interface IWizardStepsConfig {
  steps: string[];
  activeSteps: string[];
}
