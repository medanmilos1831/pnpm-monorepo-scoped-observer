export enum WizardStepLifecycle {
  ENTER = "enter",
  LEAVE = "leave",
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
  onNext: () => void;
  stepValidate?: (params: any) => boolean;
  onMutateStepState?: (state: any) => void;
  onEnter?: (params: Omit<IWizardStepLifecycleParams, "lifecycle">) => void;
  onLeave?: (params: Omit<IWizardStepLifecycleParams, "lifecycle">) => void;
}

export interface IWizardStepNavigateParams {
  toStep: string;
  command: string;
  resolve: () => void;
  reject: () => void;
}

export interface IWizardStepMutateStepStateParams {
  completed: () => void;
  uncompleted: () => void;
}

export interface IWizardStepLifecycleParams {
  lifecycle: WizardStepLifecycle;
  completed: () => void;
  uncompleted: () => void;
}
