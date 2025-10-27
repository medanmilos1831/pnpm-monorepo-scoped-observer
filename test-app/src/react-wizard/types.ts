import type { createGetters } from "./Store/createGetters";
import type { createMutations } from "./Store/createMutations";
import type { createNavigation } from "./Store/createNavigation";
import type { createState } from "./Store/createState";

export const WIZARD_STORE_SCOPE = "wizard-store" as const;
export const WIZARD_OBSERVER_SCOPE = "wizard-observer" as const;
export const WIZARD_STEP_OBSERVER_SCOPE = "wizard-step-observer" as const;

export interface IEntity {
  state: ReturnType<typeof createState>;
  getters: ReturnType<typeof createGetters>;
  mutations: ReturnType<typeof createMutations>;
  mount: () => void;
  addEventListener: (
    eventName: eventsWizard,
    callback: (payload: any) => void
  ) => () => void;
  // step: ReturnType<typeof createStep>;
  navigation: ReturnType<typeof createNavigation>;
}

export interface IWizardConfig {
  id: string;
  steps: string[];
  activeStep: string;
  onReset?: onReset;
  onFinish?: onFinish;
}

export enum WizardStoreEvents {
  CREATE_WIZARD = "createWizard",
}

export enum WizardEvents {
  ON_STEP_CHANGE = "onStepChange",
  ON_RESET = "onReset",
  ON_FINISH = "onFinish",
}

export type eventsWizard = "onFinish" | "onReset" | "onStepChange";
export type eventsStep = "onNext" | "onPrevious";
export enum commandType {
  NEXT = "next",
  PREVIOUS = "previous",
  GO_TO_STEP = "goToStep",
}

export type onReset = () => void;
export type onFinish = () => void;

export enum WizardCommands {
  NEXT = "next",
  PREVIOUS = "previous",
}
interface IOnNavigateParams {
  activeStep: string;
  toStep: string;
  updateSteps: (callback: (steps: string[]) => string[]) => void;
}

interface IOnValidateParams {
  payload: any;
  command: commandType;
  activeStep: string;
  toStep: string;
  resolve: () => void;
}

export interface IWizardStep {
  onNext?: (params: IOnNavigateParams) => void;
  onPrevious?: (params: IOnNavigateParams) => void;
  validate?: (params: IOnValidateParams) => void;
}

export type stepTransitionObject = {
  command: `${commandType}`;
  stepName: string | null;
  payload?: any;
  clientProp: "onNext" | "onPrevious";
};
