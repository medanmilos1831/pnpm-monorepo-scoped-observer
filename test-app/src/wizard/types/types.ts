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
  stepValidate?: (params: IStepValidateParams) => boolean;
  onMutateStepState?: (params: IWizardStepMutateStepStateParams) => void;
  onEnter?: () => void;
  onLeave?: () => void;
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
  completed: () => void;
  uncompleted: () => void;
  invalidated: () => void;
  validate: () => void;
  currentState: any;
  prevState: any;
}
