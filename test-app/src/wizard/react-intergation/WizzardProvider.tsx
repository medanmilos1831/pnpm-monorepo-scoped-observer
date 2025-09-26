import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { createWizard } from "../createWizard";
import {
  type IRuleParams,
  type IStepProps,
  type IMutateStepStateEventPayload,
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
  onFailed,
  onNext,
  guardRule,
  complitionRule,
}: PropsWithChildren<IStepProps>) => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }
  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: "wizard",
      eventName: "onNavigate",
      callback: ({ payload }: { payload: any }) => {
        console.log("NAVIGATE", payload);
      },
    });
    return () => {
      unsubscribe();
    };
  });
  // MUTATE STEP STATE
  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: "wizard:step",
      eventName: "mutateStepState",
      callback: ({ payload }: { payload: IMutateStepStateEventPayload }) => {
        if (guardRule) {
          const value = guardRule({
            currentState: payload.currentState,
            prevState: payload.prevState,
          });
          payload.ruleCallback({ rule: "status", value });
        }
        if (complitionRule) {
          const value = complitionRule({
            currentState: payload.currentState,
            prevState: payload.prevState,
          });
          payload.ruleCallback({ rule: "isCompleted", value });
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
