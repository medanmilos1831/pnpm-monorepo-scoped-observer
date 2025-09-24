import type { WizardCommand } from "./constants";

export interface IWizardConfig {
  name: string;
  steps: string[];
  activeStep: string;
  activeSteps: string[];
}

export type clientValidationReject = (
  obj?: clientValidationRejectParams
) => void;
export type clientValidationRejectParams = {
  message?: string;
};

export type WizardPending = {
  command: WizardCommand | null;
  stepName: string | null;
};

export type wizzardRejectParamsType = {
  errorMessage: string;
  command: WizardCommand;
  stepName: string;
};

export interface IStep extends WizardRoute {
  name: string;
  isCompleted: boolean;
  isChanged: boolean;
  state: any;
  stepHistory: any;
}

export interface WizardRoute {
  name: string;
  visible: boolean;
  validators: {
    onNext?: (
      step: IStep,
      resolve: () => void,
      reject: clientValidationReject,
      pending: boolean
    ) => void;
    onPrev?: (
      step: IStep,
      resolve: () => void,
      reject: clientValidationReject,
      pending: boolean
    ) => void;
  };
}

export type WizardRouteWithoutValidators = Omit<WizardRoute, "validators">;

export interface WizardOptions {
  activeStep: string;
}

export interface WizardState {
  isFirst: boolean;
  isLast: boolean;
  activeStep: string;
  step: {
    isCompleted: boolean;
    isChanged: boolean;
    state: any;
  };
}
