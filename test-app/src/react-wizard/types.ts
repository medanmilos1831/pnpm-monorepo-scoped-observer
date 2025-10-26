export const WIZARD_STORE_SCOPE = "wizard-store" as const;
export const WIZARD_OBSERVER_SCOPE = "wizard-observer" as const;

export interface IWizardConfig {
  id: string;
  steps: string[];
  activeStep: string;
  onReset?: onReset;
  onFinish?: onFinish;
}

export enum WizardStoreEvents {
  CREATE_WIZARD = "createWizard",
}

export enum WizardEvents {
  ON_STEP_CHANGE = "onStepChange",
  ON_RESET = "onReset",
  ON_FINISH = "onFinish",
}

export type events =
  | "onFinish"
  | "onReset"
  | "onStepChange"
  | "onNext"
  | "onPrevious";
export enum commandType {
  NEXT = "next",
  PREVIOUS = "previous",
  GO_TO_STEP = "goToStep",
}

export type onReset = () => void;
export type onFinish = () => void;

export enum WizardCommands {
  NEXT = "next",
  PREVIOUS = "previous",
}
interface IOnNavigateParams {
  activeStep: string;
  toStep: string;
  updateSteps: (callback: (steps: string[]) => string[]) => void;
}

interface IOnValidateParams {
  actionType?: string;
  command: WizardCommands;
  activeStep: string;
  toStep: string;
  resolve: () => void;
}

export interface IWizardStep {
  onNext?: (params: IOnNavigateParams) => void;
  onPrevious?: (params: IOnNavigateParams) => void;
  validate?: (params: IOnValidateParams) => void;
}

export type stepTransitionObject = {
  command: `${commandType}`;
  stepName: string | null;
  payload?: any;
  clientProp: "onNext" | "onPrevious";
};
