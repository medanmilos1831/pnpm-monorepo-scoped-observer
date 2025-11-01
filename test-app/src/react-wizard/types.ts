import type { createStore } from "./Store/createStore";
import type { createWizardModules } from "./Store/Entity/createWizardModules";
import type { createWizardState } from "./Store/Entity/createWizardState";

// ===========================================
// SCOPES
// ===========================================
export const WIZARD_STORE_SCOPE = "wizard-store" as const;
export const WIZARD_OBSERVER_SCOPE = "wizard-observer" as const;
export const WIZARD_STEP_OBSERVER_SCOPE = "wizard-step-observer" as const;

// ===========================================
// END SCOPES
// ===========================================

// ===========================================
// CONFIGURATION TYPES
// ===========================================
export interface IEntity {
  stateManager: ReturnType<typeof createWizardState>;
  modules: ReturnType<typeof createWizardModules>;
}

export interface IWizardConfig {
  id: string;
  steps: string[];
  activeStep: string;
  onReset?: onReset;
  onFinish?: onFinish;
}

export type onReset = () => void;
export type onFinish = () => void;

interface IOnNavigateParams {
  from: string;
  to: string;
}

interface IOnValidateParams {
  payload: any;
  command: wizardCommandsType;
  activeStep: string;
  toStep: string;
  resolve: () => void;
}

export interface IWizardStep {
  [stepMiddlewares.ON_NEXT]?: (params: IOnNavigateParams) => void;
  [stepMiddlewares.ON_PREVIOUS]?: (params: IOnNavigateParams) => void;
  validate?: (params: IOnValidateParams) => void;
}

export enum stepMiddlewares {
  ON_NEXT = "onNext",
  ON_PREVIOUS = "onPrevious",
}
export type stepMiddlewaresType = `${stepMiddlewares}`;

// ===========================================
// END CONFIGURATION TYPES
// ===========================================

// ===========================================
// EVENT TYPES
// ===========================================

export enum WizardStoreEvents {
  CREATE_WIZARD = "createWizard",
}

export enum WizardPublicEvents {
  ON_STEP_CHANGE = "onStepChange",
  ON_RESET = "onReset",
  ON_FINISH = "onFinish",
}

export enum WizardInternalEvents {
  ON_STEPS_UPDATE = "onStepsUpdate",
}

export type WizardPublicEventsType = `${WizardPublicEvents}`;
export type WizardInternalEventsType = `${WizardInternalEvents}`;

// ===========================================
// END EVENT TYPES
// ===========================================

// ===========================================
// COMMAND TYPES
// ===========================================

export enum wizardCommands {
  NEXT = "next",
  PREVIOUS = "previous",
  GO_TO_STEP = "goToStep",
}

export type wizardCommandsType = `${wizardCommands}`;

export type navigateParamsType = {
  command: wizardCommandsType;
  toStep: string | null;
  payload?: any;
  isReset: boolean;
  middleware: stepMiddlewaresType | null;
};

// ===========================================
// END COMMAND TYPES
// ===========================================

export type StoreReturnType = ReturnType<typeof createStore<IEntity>>;
