export interface IWizardConfig {
  name: string;
  steps: string[];
  activeStep: string;
  activeSteps: string[];
}

export interface IStep extends WizzardRoute {
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
    onNext?: (
      step: IStep,
      resolve: () => void,
      reject: (obj?: { payload?: any }) => void
    ) => any;
    onPrev?: (
      step: IStep,
      resolve: () => void,
      reject: (obj?: { payload?: any }) => void
    ) => boolean;
  };
}

export interface WizzardOptions {
  activeStep: string;
}
