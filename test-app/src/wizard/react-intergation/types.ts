import type { WizardCommands } from "../Store/Entity/types";

export interface IWizardStep {
  onNext?: (params: IOnNextPreviousParams) => void;
  onPrevious?: (params: IOnNextPreviousParams) => void;
  validate?: (params: IOnValidateParams) => void;
  middlewareOnNext?: (params: IOnMiddlewareNextPreviousParams) => void;
  middlewareOnPrevious?: (params: IOnMiddlewareNextPreviousParams) => void;
}

export interface IOnNextPreviousParams {
  activeStep: string;
  toStep: string;
}

export interface IOnMiddlewareNextPreviousParams {
  updateSteps: (callback: (steps: string[]) => string[]) => void;
}

export interface IOnValidateParams {
  actionType: string;
  command: WizardCommands;
  activeStep: string;
  toStep: string;
  resolve: () => void;
}
