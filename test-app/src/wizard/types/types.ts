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
  onEnter?: () => void;
}

export interface IWizardStepNavigateParams {
  toStep: string;
  command: string;
  resolve: () => void;
  reject: () => void;
}
