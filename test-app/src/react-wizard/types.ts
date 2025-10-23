export const WIZARD_STORE_SCOPE = "wizard-store" as const;

export interface IWizardConfig {
  id: string;
  steps: string[];
  activeStep: string;
  onReset?: onReset;
  onFinish?: onFinish;
  renderOnFinish?: renderOnFinish;
}

export type onReset = () => void;
export type onFinish = (params: { reset: onReset; render: () => void }) => void;
export type renderOnFinish = (params: { reset: onReset }) => React.ReactNode;

export enum WizardCommands {
  NEXT = "next",
  PREVIOUS = "previous",
}
