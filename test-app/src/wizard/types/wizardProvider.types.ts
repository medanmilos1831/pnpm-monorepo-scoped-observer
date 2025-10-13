export interface IWizardProvider {
  wizard: any;
}

export interface IWizard {
  id: string;
  steps: string[];
  activeStep: string;
}
