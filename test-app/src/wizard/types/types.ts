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
  onNext?: (obj: INavigationValidationParams) => void;
  onPrev?: (obj: INavigationValidationParams) => void;
  onFail?: (obj: IFailChangeStepEventPayload) => void;
  onLeave?: (obj: ILeaveStepEventPayload) => void;
}

export interface INavigationValidationParams {
  params: {
    state: any;
    prevState: any;
    isCompleted: boolean;
    transitionForm: string;
    transitionTo: string;
  };
  resolve: () => void;
  reject: (params: { message: string }) => void;
}

export interface IChangeStepEventPayload extends INavigationValidationParams {
  command: WizardCommands;
}

export interface IFailChangeStepEventPayload
  extends Pick<INavigationValidationParams, "params"> {
  command: WizardCommands;
  message: string;
}

export interface ILeaveStepEventPayload
  extends Pick<INavigationValidationParams, "params"> {
  command: WizardCommands;
}

export interface IWizardConfig {
  activeStep: string;
}

export interface IWizardStepsConfig {
  steps: string[];
  activeSteps: string[];
}
