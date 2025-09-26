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
  stepValidate?: (params: IStepValidateParams) => boolean;
  onMutateStepState?: (params: IWizardStepMutateStepStateParams) => void;
  onEnter?: (params: Omit<IWizardStepLifecycleParams, "lifecycle">) => void;
  onLeave?: (params: Omit<IWizardStepLifecycleParams, "lifecycle">) => void;
}

export interface IStepValidateParams {
  toStep: string;
  command: WizardCommands;
  currentState: any;
  prevState: any;
  resolve: () => void;
  reject: () => void;
  status: StepValidationStatus;
}

export interface IWizardStepNavigateParams {
  toStep: string;
  command: WizardCommands;
  resolve: () => void;
  reject: () => void;
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
}
