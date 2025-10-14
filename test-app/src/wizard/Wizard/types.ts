export interface IWizard {
  id: string;
  steps: string[];
  activeStep: string;
}

export interface IWizardConfig {
  id: string;
  steps: string[];
  activeStep: string;
  onReset?: onReset;
  onFinish?: onFinish;
  renderOnFinish?: renderOnFinish;
}

export type onReset = () => void;
export type onFinish = (params: {
  reset: onReset;
  render: () => React.ReactNode;
}) => void;
export type renderOnFinish = (params: { reset: onReset }) => React.ReactNode;
