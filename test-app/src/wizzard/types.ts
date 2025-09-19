export interface IWizardConfig {
  name: string;
  steps: string[];
  activeStep: string;
  activeSteps: string[];
}

export interface IStep {
  name: string;
  isCompleted: boolean;
  isChanged: boolean;
  state: any;
  update: (data: any) => void;
}
