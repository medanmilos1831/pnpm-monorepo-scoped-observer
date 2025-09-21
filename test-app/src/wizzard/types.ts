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
  stepHistory: any;
}

export interface WizzardRoute {
  name: string;
  visible: boolean;
  validators: {
    onNext?: (step: IStep, resolve: () => void, reject: () => void) => any;
    onPrev?: (step: IStep, resolve: () => void, reject: () => void) => boolean;
  };
}

export interface WizzardOptions {
  activeStep: string;
}
