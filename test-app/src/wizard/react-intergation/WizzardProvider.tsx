import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { createWizard } from "../createWizard";
import {
  type IMutateStepStateEventPayload,
  type IOnNavigateEventPayload,
  type IStepProps,
  StepValidationStatus,
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
      callback: ({ payload }: { payload: IOnNavigateEventPayload }) => {
        payload.collector(
          payload.status === StepValidationStatus.INVALID ? onFailed : onNext
        );
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
        payload.collector([
          { rule: "guardRule", value: guardRule },
          { rule: "complitionRule", value: complitionRule },
        ]);
      },
    });
    return () => {
      unsubscribe();
    };
  });
  return <>{children}</>;
};

export { Context, WizzardProvider };
