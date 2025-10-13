export enum WizardCommands {
  NEXT = "next",
  PREVIOUS = "previous",
}
export enum WizardEvents {
  ON_NEXT = "onNext",
  ON_PREVIOUS = "onPrevious",
}
export interface IWizard {
  id: string;
  steps: string[];
  activeStep: string;
}
