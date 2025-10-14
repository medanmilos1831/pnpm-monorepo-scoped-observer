import type { WizardCommands } from "../types";
import type { Wizard } from "../Wizard";
import type { Step } from "../Wizard";

export interface IWizardProviderHOC {
  disconnect: () => void;
  wizard: Wizard;
  step: Step;
  client: any;
  onReset?: () => void;
  onFinish?: (params: any) => void;
  renderOnFinish?: (params: any) => React.ReactNode;
}

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
