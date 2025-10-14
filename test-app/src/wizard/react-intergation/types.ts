import type { Wizard } from "../Wizard";
import type { Step } from "../Wizard";

export interface IWizardProviderHOC {
  disconnect: () => void;
  wizard: Wizard;
  step: Step;
  client: any;
  onReset?: () => void;
  onFinish?: (params: any) => void;
}

export interface IWizardStep {
  onNext?: (params: any) => void;
  onPrevious?: (params: any) => void;
  validate?: (params: any) => void;
  middleware?: (params: any) => void;
}
