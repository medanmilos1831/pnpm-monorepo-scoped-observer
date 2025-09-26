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
  onStepChange: (params: IOnNavigateParams) => void;
  guardRule?: (params: IRuleParams) => boolean;
  complitionRule?: (params: IRuleParams) => boolean;
}

export interface IOnNavigateParams {
  currentState: any;
  prevState: any;
  toStep: string;
  fromStep: string;
  status: StepValidationStatus;
  isCompleted: boolean;
  resolve: () => void;
  command: WizardCommands;
  needsApproval: () => void;
}

export interface IRuleParams {
  currentState: any;
  prevState: any;
}

export interface IMutateStepStateEventPayload {
  collector: (
    rules: Array<{
      rule: string;
      value: ((params: IRuleParams) => boolean) | undefined;
    }>
  ) => void;
}

export interface IOnNavigateEventPayload {
  collector: (
    fn: Array<{ name: string; value: IStepProps["onStepChange"] }>
  ) => void;
}
