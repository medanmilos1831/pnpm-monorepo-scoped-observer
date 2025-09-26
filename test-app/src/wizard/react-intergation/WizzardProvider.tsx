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
  onFailed,
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
      scope: "wizard",
      eventName: "onNavigate",
      callback: ({ payload }: { payload: IWizardStepNavigateParams }) => {
        const { action, navigate, failed, callback, ...rest } = payload;
        if (action === "onFailed" && onFailed) {
          onFailed(rest);
        }
        if (action === "onChange" && onStepChange) {
          onStepChange(rest);
        }
        callback();
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
        console.log("ON STEP TRANSITION", payload);
        // const { lifecycle, ...rest } = payload;

        // if (lifecycle === WizardStepLifecycle.ENTER && onEnter) {
        //   console.log("ON ENTER", rest);
        //   // onEnter();
        // }
        // if (lifecycle === WizardStepLifecycle.LEAVE && onLeave) {
        //   console.log("ON LEAVE", rest);
        //   // onLeave();
        // }
      },
    });
    return () => {
      unsubscribe();
    };
  });
  return <>{children}</>;
};

export { WizzardProvider, Context };
