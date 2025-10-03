export enum WizardCommands {
  NEXT = "next",
  PREV = "prev",
}

export enum WizardStatus {
  ACTIVE = "active",
  SUCCESS = "success",
}

export const WizardEvents = {
  NAVIGATE: "navigate",
  BEFORE_CHANGE_STEP: "beforeChangeStep",
  CHANGE_STEP: "changeStep",
  STEP_STATE_STATE: "stepStateState",
  FAIL_CHANGE_STEP: "onFail",
  LEAVE_STEP: "onLeave",
  ON_FINISH: "onFinish",
  ON_UPDATE_STEPS: "onUpdateSteps",
  RESET: "reset",
  SET_STATUS: "setStatus",
  NAVIGATE_TO_STEP: "navigateToStep",
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
