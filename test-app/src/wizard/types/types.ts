export enum WizardCommands {
  NEXT = "next",
  PREV = "prev",
}

export const WizardEvents = {
  NAVIGATE: "navigate",
  BEFORE_CHANGE_STEP: "beforeChangeStep",
  CHANGE_STEP: "changeStep",
  STEP_STATE_STATE: "stepStateState",
  FAIL_CHANGE_STEP: "failChangeStep",
  LEAVE_STEP: "leaveStep",
};

export interface IStepProps {
  onNext?: (obj: IBeforeChangeEventPayload) => void;
  onPrev?: (obj: IBeforeChangeEventPayload) => void;
  onFail?: (obj: IFailChangeStepEventPayload) => void;
  onLeave?: (obj: ILeaveStepEventPayload) => void;
}

// EVENTS PAYLOAD
export interface IBeforeChangeEventPayload {
  command: WizardCommands;
  params: ITransitionParams;
  resolve: () => void;
  reject: (params: IRejectParams) => void;
}

export interface IFailChangeStepEventPayload {
  command: WizardCommands;
  params: ITransitionParams;
  message: string;
}

export interface ILeaveStepEventPayload {
  command: WizardCommands;
  params: ITransitionParams;
}

// END :: EVENTS PAYLOAD

export interface IRejectParams {
  message: string;
}

export interface ITransitionParams {
  state: any;
  prevState: any;
  isCompleted: boolean;
  transitionForm: string;
  transitionTo: string;
}

export interface IWizardConfig {
  activeStep: string;
}

export interface IWizardStepsConfig {
  steps: string[];
  activeSteps: string[];
}
