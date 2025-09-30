import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { createWizard } from "../createWizard";
import {
  WizardCommands,
  WizardEvents,
  type IChangeStepEventPayload,
  type IFailChangeStepEventPayload,
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
}: PropsWithChildren<IStepProps>) => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }
  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: "wizard:commands",
      eventName: WizardEvents.BEFORE_CHANGE_STEP,
      callback: ({ payload }: { payload: IChangeStepEventPayload }) => {
        const { command, resolve, reject, params } = payload;
        if (command === WizardCommands.NEXT) {
          onNext
            ? onNext({
                params,
                resolve,
                reject,
              })
            : resolve();
        }
        if (command === WizardCommands.PREV) {
          onPrev
            ? onPrev({
                params,
                resolve,
                reject,
              })
            : resolve();
        }
      },
    });
    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: "wizard:commands",
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
