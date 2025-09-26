import React, { createContext, useContext, useEffect, useState } from "react";
import { Wizard } from "../core/Wizard";
import { WizardStepLifecycle, type IWizardStepLifecycleParams } from "../types";

interface IWizardContext {
  wizard: Wizard;
  getActiveStep: () => string;
  subscribe: (config: any) => () => void;
}

const WizardContext = createContext<IWizardContext | null>(null);

export const WizzardProvider = ({ children }: { children: React.ReactNode }) => {
  const [wizard] = useState(() => new Wizard({ activeStep: "stepOne" }, { steps: ["stepOne", "stepTwo", "stepThree", "stepFour", "stepFive"], activeSteps: ["stepOne", "stepTwo", "stepThree", "stepFour", "stepFive"] }));

  const getActiveStep = () => wizard.currentStep;

  const subscribe = (config: any) => wizard.observer.subscribe(config);

  return (
    <WizardContext.Provider value={{ wizard, getActiveStep, subscribe }}>
      {children}
    </WizardContext.Provider>
  );
};

WizzardProvider.Step = ({
  onNext,
  onFailed,
  onMutateStepState,
  guardRule,
  onEnter,
  onLeave,
  children,
}: {
  onNext?: (params: any) => void;
  onFailed?: (params: any) => void;
  onMutateStepState?: (params: any) => void;
  guardRule?: (params: { currentState: any; prevState: any }) => boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  children: React.ReactNode;
}) => {
  const context = useContext(WizardContext);
  if (!context) throw new Error("WizzardProvider.Step must be used within WizzardProvider");

  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: "wizard",
      eventName: "onNavigate",
      callback: ({ payload }: { payload: any }) => {
      },
    });
    return () => {
      unsubscribe();
    };
  }, [context, onNext, onFailed]);

  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: "wizard:step",
      eventName: `onStepTransition:${context.getActiveStep()}`,
      callback: ({ payload }: { payload: IWizardStepLifecycleParams }) => {
        const { lifecycle } = payload;

        if (lifecycle === WizardStepLifecycle.ENTER && onEnter) {
          onEnter();
        }
        if (lifecycle === WizardStepLifecycle.LEAVE && onLeave) {
          onLeave();
        }
      },
    });
    return () => {
      unsubscribe();
    };
  }, [context, onEnter, onLeave]);

  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: "wizard:step",
      eventName: "mutateStepState",
      callback: ({ payload }: { payload: any }) => {
        if (onMutateStepState) {
          onMutateStepState(payload);
        }
      },
    });
    return () => {
      unsubscribe();
    };
  }, [context, onMutateStepState]);

  return <>{children}</>;
};