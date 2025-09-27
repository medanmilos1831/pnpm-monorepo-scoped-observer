import type { Step } from "../core";

export enum WizardStepLifecycle {
  ENTER = "enter",
  LEAVE = "leave",
}

export enum NavigationCapabilitiesType {
  REGULAR = "regular",
  NEEDS_APPROVAL = "needsApproval",
}

export enum WizardCommands {
  NEXT = "next",
  PREV = "prev",
}

export enum StepStatus {
  REGULAR = "regular",
  NEEDS_APPROVAL = "needsApproval",
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
  statusHandler?: (params: IHandlerParams) => StepStatus;
  completionHandler?: (params: IHandlerParams) => boolean;
}

export interface IOnNavigateParams {
  currentState: any;
  prevState: any;
  toStep: string;
  fromStep: string;
  status: StepStatus;
  isCompleted: boolean;
  resolve: () => void;
  needsApproval: () => void;
  command: WizardCommands;
}

export interface IHandlerParams {
  currentState: any;
  prevState: any;
}

export interface IMutateStepStateEventPayload {
  collector: (handlers: {
    status: IStepProps["statusHandler"];
    isCompleted: IStepProps["completionHandler"];
  }) => void;
}

export interface IOnNavigateEventPayload {
  collector: (
    fn: Array<{ name: string; value: IStepProps["onStepChange"] }>
  ) => void;
}
