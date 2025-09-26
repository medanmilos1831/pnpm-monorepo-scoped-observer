export enum WizardStepLifecycle {
  ENTER = "enter",
  LEAVE = "leave",
}

export enum WizardCommands {
  NEXT = "next",
  PREV = "prev",
}

export enum StepValidationStatus {
  VALID = "valid",
  INVALID = "invalid",
}

export interface IWizardConfig {
  activeStep: string;
}

export interface IWizardStepsConfig {
  steps: string[];
  activeSteps: string[];
}

export interface IStepConfig {
  visible: boolean;
}

export interface IStepProps {
  onStepChange?: (params: IStepValidateParams) => void;
  onFailed?: (params: IStepValidateParams) => void;
  onMutateStepState?: (params: IWizardStepMutateStepStateParams) => void;
  onEnter?: (params: IStepValidateParams) => void;
  onLeave?: (params: IStepValidateParams) => void;
}

export interface IStepValidateParams {
  toStep: string;
  command: WizardCommands;
  currentState: any;
  prevState: any;
  status: StepValidationStatus;
}

export interface IWizardStepNavigateParams {
  toStep: string;
  command: WizardCommands;
  action: "onFailed" | "onChange";
  currentState: any;
  prevState: any;
  status: StepValidationStatus;
  navigate: () => void;
  failed: () => void;
  callback: () => void;
}

export interface IWizardStepMutateStepStateParams {
  completed: () => void;
  uncompleted: () => void;
  currentState: any;
  prevState: any;
  invalidated: () => void;
  validate: () => void;
}

export interface IWizardStepLifecycleParams {
  lifecycle: WizardStepLifecycle;
  params: IStepValidateParams;
}
