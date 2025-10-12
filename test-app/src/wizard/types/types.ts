export enum WizardCommands {
  NEXT = "next",
  PREV = "prev",
}

export enum WizardStatus {
  ACTIVE = "active",
  SUCCESS = "success",
}

export const WizardEvents = {
  ON_NAVIGATE: "onNavigate",
  ON_CHANGE_STEP: "onChangeStep",
  ON_FAIL: "onFail",
  ON_FINISH: "onFinish",
  ON_UPDATE_STEPS: "onUpdateSteps",
  ON_SET_STATUS: "onSetStatus",
  ON_NEXT: "onNext",
  ON_PREV: "onPrev",
};

export const WIZARD_SCOPE = "wizard" as const;

export interface IStepProps {
  onNext?: (obj: IOnNextOnPrevEventPayload) => void;
  onPrev?: (obj: IOnNextOnPrevEventPayload) => void;
  onFail?: (obj: IFailChangeStepEventPayload) => void;
  onFinish?: (obj: any) => void;
}

// EVENTS PAYLOAD
export interface IOnNextOnPrevEventPayload {
  command: WizardCommands;
  params: ITransitionParams;
  actionMeta: IMeta;
  resolve: () => void;
  reject: (params: IRejectParams) => void;
}

export interface INavigateEventPayload {
  command: WizardCommands;
  actionMeta: IMeta;
}

export interface IFailChangeStepEventPayload {
  command: WizardCommands;
  params: ITransitionParams;
  message: string;
}

// END :: EVENTS PAYLOAD

export interface IRejectParams {
  message: string;
}

export interface ITransitionParams {
  transitionForm: string;
  transitionTo: string;
}

export interface IWizardConfig {
  activeStep: string;
}

export interface IWizardStepsConfig {
  activeSteps: string[];
}

export interface IMeta {
  actionType: string;
}
