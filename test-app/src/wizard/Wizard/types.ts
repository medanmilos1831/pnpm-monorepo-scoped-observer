export interface IWizard {
  id: string;
  steps: string[];
  activeStep: string;
}

export interface IWizardConfig {
  id: string;
  steps: string[];
  activeStep: string;
  onReset?: () => void;
  onFinish?: (params: any) => void;
}
