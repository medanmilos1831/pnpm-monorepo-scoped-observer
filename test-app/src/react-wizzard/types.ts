import React from "react";

export type WizzardConfig = {
  initStep: string;
  infinite?: boolean; // ← NOVO: infinite loop mode opcija
  onChange?: (step: string, direction: 'next' | 'prev' | 'goTo' | 'reset') => void; // ← NOVO: onChange callback
  steps: {
    [key: string]: {
      element: React.ComponentType<any>; // ← React komponenta umesto funkcije
    };
  };
};

export type WizzardHandlerChildrenProps = {
  name: string; // ← NOVO: wizzard name
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
  Element: React.ComponentType<any>; // ← Uvek vraća JSX element, nema null
};

export type WizzardHandlerProps = {
  children: (props: WizzardHandlerChildrenProps) => JSX.Element;
  name: string;
};
