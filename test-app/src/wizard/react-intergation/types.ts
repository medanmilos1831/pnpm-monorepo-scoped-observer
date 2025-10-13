export interface IWizardProviderHOC {
  id: string;
  disconnect: () => void;
  client: any;
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
