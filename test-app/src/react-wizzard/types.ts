import React from "react";

export type WizzardConfig = {
  initStep: string;
  infinite?: boolean;
  onChange?: (data: WizzardData) => void;
  steps: {
    [key: string]: {
      element: React.ComponentType<any>;
    };
  };
};

export type WizzardHandlerChildrenProps = {
  name: string;
  currentStep: string;
  totalSteps: number;
  activeStep: string;
  nextStep: string;
  prevStep: string;
  isFirst: boolean;
  isLast: boolean;
  nextStepFn: () => void;
  prevStepFn: () => void;
  goToStep: (step: string) => void;
  reset: () => void;
  Element: React.ComponentType<any>;
};

export type WizzardHandlerProps = {
  children: (props: WizzardHandlerChildrenProps) => JSX.Element;
  name: string;
  onChange?: (data: WizzardData) => void;
};

// useWatch types following react-visibility-state pattern
type DefaultWizzardReturn = {
  activeStep: string;
  currentStep: string;
  totalSteps: number;
  isFirst: boolean;
  isLast: boolean;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: string) => void;
  reset: () => void;
};

type CallbackWizzardReturn<C> = {
  activeStep: string;
  currentStep: string;
  totalSteps: number;
  isFirst: boolean;
  isLast: boolean;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: string) => void;
  reset: () => void;
  callbackValue: C;
};

export type UseWatchReturn<C> = C extends undefined
  ? DefaultWizzardReturn
  : CallbackWizzardReturn<C>;

// Wizzard data object type (same as onChange receives)
export type WizzardData = {
  name: string;
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
};

/**
 * Interface representing a wizzard instance.
 * Used for typing utility functions and other operations.
 */
export interface WizzardInstanceInterface {
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
  update(name: string, config: any): void;
}
