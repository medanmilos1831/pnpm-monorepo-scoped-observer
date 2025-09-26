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
  onNext?: (params: any) => void;
  onFailed?: (params: any) => void;
  guardRule?: (params: IRuleParams) => boolean;
  complitionRule?: (params: IRuleParams) => boolean;
}

export interface IRuleParams {
  currentState: any;
  prevState: any;
}

export interface IMutateStepStateEventPayload {
  currentState: any;
  prevState: any;
  ruleCallback: ({ rule, value }: { rule: string; value: boolean }) => void;
}
