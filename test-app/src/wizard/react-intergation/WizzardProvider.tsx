import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { createWizard } from "../createWizard";
import {
  type IStepProps,
  WizardStepLifecycle,
  type IWizardStepLifecycleParams,
  type IWizardStepMutateStepStateParams,
  type IWizardStepNavigateParams,
} from "../types";

const Context = createContext<ReturnType<typeof createWizard> | undefined>(
  undefined
);

const WizzardProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ReturnType<typeof createWizard>;
}) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

WizzardProvider.Step = ({
  children,
  onStepChange,
  onMutateStepState,
  onEnter,
  onLeave,
}: PropsWithChildren<IStepProps>) => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }
  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: "wizard:step",
      eventName: "navigate",
      callback: ({ payload }: { payload: IWizardStepNavigateParams }) => {
        console.log("onNext", payload);
        if (onStepChange) {
          onStepChange({
            toStep: payload.toStep,
            command: payload.command,
            currentState: context.getStepEntityByStepName(
              context.getActiveStep()
            ).state,
            prevState: context.getStepEntityByStepName(context.getActiveStep())
              .prevState,
            resolve: () => payload.resolve(),
            reject: () => payload.reject(),
          });
        }
      },
    });
    return () => {
      unsubscribe();
    };
  });
  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: "wizard:step",
      eventName: "mutateStepState",
      callback: ({
        payload,
      }: {
        payload: IWizardStepMutateStepStateParams;
      }) => {
        if (onMutateStepState) {
          onMutateStepState(payload);
        }
      },
    });
    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: "wizard:step",
      eventName: `onStepTransition:${context.getActiveStep()}`,
      callback: ({ payload }: { payload: IWizardStepLifecycleParams }) => {
        const { completed, uncompleted, lifecycle } = payload;
        const obj = {
          completed,
          uncompleted,
        };
        if (lifecycle === WizardStepLifecycle.ENTER && onEnter) {
          onEnter(obj);
        }
        if (lifecycle === WizardStepLifecycle.LEAVE && onLeave) {
          onLeave(obj);
        }
      },
    });
    return () => {
      unsubscribe();
    };
  });
  return <>{children}</>;
};

export { WizzardProvider, Context };
