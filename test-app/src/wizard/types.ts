export interface IWizardConfig {
  name: string;
  steps: string[];
  activeStep: string;
  activeSteps: string[];
}

export type WizardRejectCallback = (obj?: { payload?: any }) => void;

export interface IStep extends WizardRoute {
  name: string;
  isCompleted: boolean;
  isChanged: boolean;
  state: any;
  stepHistory: any;
}

export interface WizardRoute {
  name: string;
  visible: boolean;
  validators: {
    onNext?: (
      step: IStep,
      resolve: () => void,
      reject: WizardRejectCallback
    ) => void;
    onPrev?: (
      step: IStep,
      resolve: () => void,
      reject: WizardRejectCallback
    ) => void;
  };
}

export type WizardRouteWithoutValidators = Omit<WizardRoute, "validators">;

export interface WizardOptions {
  activeStep: string;
}
