import React from "react";

/**
 * Interface representing a wizzard instance.
 * Used for typing utility functions and other operations.
 */
export interface IWizzardInstance {
  name: string;
  machine: any;
  steps: string[];
  stepsConfig: { [key: string]: { element: React.ComponentType<any> } };
  currentStep: string;
  activeStep: string;
  nextStepName: string;
  prevStepName: string;
  isFirst: boolean;
  isLast: boolean;
  currentStepIndex: number;
  infinite: boolean;
  onChange?: (data: WizzardData) => void;

  // Methods
  nextStep(): void;
  prevStep(): void;
  goToStep(step: string): void;
  reset(): void;
  update(name: string, config: WizzardConfig): void;
}

export type WizzardConfig = Pick<
  IWizzardInstance,
  "activeStep" | "infinite" | "onChange" | "stepsConfig"
>;

export type WizzardHandlerChildrenProps = Pick<
  IWizzardInstance,
  | "name"
  | "currentStep"
  | "activeStep"
  | "isFirst"
  | "isLast"
  | "nextStepName"
  | "prevStepName"
  | "nextStep"
  | "prevStep"
  | "goToStep"
  | "reset"
> & {
  totalSteps: number;
  Element: React.ComponentType<any>;
};

export type WizzardHandlerProps = {
  children: (props: WizzardHandlerChildrenProps) => JSX.Element;
  name: string;
};

// useWatch types following react-visibility-state pattern
type DefaultWizzardReturn = Pick<
  IWizzardInstance,
  | "activeStep"
  | "currentStep"
  | "isFirst"
  | "isLast"
  | "nextStepName"
  | "prevStepName"
  | "goToStep"
  | "reset"
> & {
  totalSteps: number;
};

type CallbackWizzardReturn<C> = DefaultWizzardReturn & {
  callbackValue: C;
};

export type UseWatchReturn<C> = C extends undefined
  ? DefaultWizzardReturn
  : CallbackWizzardReturn<C>;

// Wizzard data object type (same as onChange receives)
export type WizzardData = Pick<
  IWizzardInstance,
  | "name"
  | "steps"
  | "stepsConfig"
  | "currentStep"
  | "activeStep"
  | "nextStepName"
  | "prevStepName"
  | "isFirst"
  | "isLast"
  | "currentStepIndex"
  | "infinite"
>;
