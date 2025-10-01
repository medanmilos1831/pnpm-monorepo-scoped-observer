import {
  createContext,
  useContext,
  useEffect,
  type PropsWithChildren,
} from "react";
import { createWizard } from "../createWizard";
import {
  WizardEvents,
  WizardScopes,
  type IBeforeChangeEventPayload,
  type IFailChangeStepEventPayload,
  type ILeaveStepEventPayload,
  type IStepProps,
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
  onNext,
  onPrev,
  onFail,
  onLeave,
}: PropsWithChildren<IStepProps>) => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }
  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: WizardScopes.COMMANDS,
      eventName: WizardEvents.BEFORE_CHANGE_STEP,
      callback: ({ payload }: { payload: IBeforeChangeEventPayload }) => {
        const obj = {
          next: () => {
            onNext ? onNext(payload) : payload.resolve();
          },
          prev: () => {
            onPrev ? onPrev(payload) : payload.resolve();
          },
        };
        obj[payload.command]();
      },
    });
    return () => {
      unsubscribe();
    };
  });

  // Subscribe to LEAVE_STEP event based on onLeave prop passed to Step component
  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: WizardScopes.COMMANDS,
      eventName: WizardEvents.LEAVE_STEP,
      callback: ({ payload }: { payload: ILeaveStepEventPayload }) => {
        if (onLeave) {
          onLeave(payload);
        }
      },
    });
    return () => {
      unsubscribe();
    };
  });

  // Subscribe to FAIL_CHANGE_STEP event based on onFail prop passed to Step component
  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: WizardScopes.COMMANDS,
      eventName: WizardEvents.FAIL_CHANGE_STEP,
      callback: ({ payload }: { payload: IFailChangeStepEventPayload }) => {
        if (onFail) {
          onFail(payload);
        }
      },
    });
    return () => {
      unsubscribe();
    };
  });
  return <>{children}</>;
};

export { Context, WizzardProvider };
