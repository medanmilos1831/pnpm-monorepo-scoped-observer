import type { WizardCommands } from "../Store/types";

export interface IWizardStep {
  onNext?: (params: IOnNavigateParams) => void;
  onPrevious?: (params: IOnNavigateParams) => void;
  validate?: (params: IOnValidateParams) => void;
}

export interface IOnNavigateParams {
  activeStep: string;
  toStep: string;
  updateSteps: (callback: (steps: string[]) => string[]) => void;
}

export interface IOnValidateParams {
  actionType?: string;
  command: WizardCommands;
  activeStep: string;
  toStep: string;
  resolve: () => void;
}
