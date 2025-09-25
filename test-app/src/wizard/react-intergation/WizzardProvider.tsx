import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { createWizard } from "../createWizard";
import type { IStepProps, IWizardStepNavigateParams } from "../types";

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
  stepValidate,
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
        console.log("***************WizzardProvider.Step***************");
        stepValidate
          ? (() => {
              let result = stepValidate({
                toStep: payload.toStep,
                command: payload.command,
              });
              result ? payload.resolve() : payload.reject();
            })()
          : (() => {
              onNext();
              payload.resolve();
            })();
      },
    });
    return () => {
      unsubscribe();
    };
  });
  return <>{children}</>;
};

export { WizzardProvider, Context };
