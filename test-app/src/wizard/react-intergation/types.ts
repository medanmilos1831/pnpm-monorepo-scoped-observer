import type { Wizard } from "../Wizard";
import type { Step } from "../Wizard";

export interface IWizardProviderHOC {
  disconnect: () => void;
  wizard: Wizard;
  step: Step;
  client: any;
  onReset?: () => void;
  onFinish?: (params: any) => void;
  renderOnFinish?: (params: any) => React.ReactNode;
}

export interface IWizardStep {
  onNext?: (params: any) => void;
  onPrevious?: (params: any) => void;
  validate?: (params: any) => void;
  middlewareOnNext?: (params: any) => void;
  middlewareOnPrevious?: (params: any) => void;
}
