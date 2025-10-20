import type { createClient } from "./Entity/createClient";
import type { WizardModule } from "./Entity/WizardModule";
import type { StepModule } from "./Entity/StepModule";

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
  ON_STEP_CHANGE = "onStepChange",
  ON_RESET = "onReset",
  ON_FINISH = "onFinish",
}

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
