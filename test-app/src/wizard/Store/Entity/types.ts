import type { createClient } from "./createClient";
import type { WizardModule } from "./WizardModule";
import type { StepModule } from "./StepModule";

export interface IEntity {
  wizard: WizardModule;
  step: StepModule;
  client: ReturnType<typeof createClient>;
}

export enum WizardCommands {
  NEXT = "next",
  PREVIOUS = "previous",
}
export enum WizardEvents {
  ON_NEXT = "onNext",
  ON_PREVIOUS = "onPrevious",
  ON_STEP_CHANGE = "onStepChange",
  ON_RESET = "onReset",
  ON_FINISH = "onFinish",
}

export enum WizardInternalEvents {
  ON_VALIDATE = "onValidate",
  ON_MIDDLEWARE_NEXT = "onMiddlewareNext",
  ON_MIDDLEWARE_PREVIOUS = "onMiddlewarePrevious",
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
export type onFinish = (params: { reset: onReset; render: () => void }) => void;
export type renderOnFinish = (params: { reset: onReset }) => React.ReactNode;
