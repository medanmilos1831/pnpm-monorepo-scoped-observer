import type { StepEntity } from "../Wizard";

export interface IWizardProviderHOC {
  disconnect: () => void;
  client: any;
  stepEntity: StepEntity;
}

export interface IWizardStep {
  commands?: {
    onNext?: () => void;
    onPrevious?: () => void;
  };
  validate?: {
    onNext?: () => boolean;
    onPrevious?: () => boolean;
  };
}
