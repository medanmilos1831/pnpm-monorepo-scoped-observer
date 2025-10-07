import {
  createContext,
  useContext,
  useEffect,
  type PropsWithChildren,
} from "react";
import { type IStepProps } from "../types";
import { createWizardClient } from "../createWizardClient";

const WizardContext = createContext<
  | {
      wizard: ReturnType<typeof createWizardClient>;
      getWizard: (name?: string) => ReturnType<typeof createWizardClient>;
    }
  | undefined
>(undefined);

const WizardProvider = ({
  children,
  wizard,
  disconnect,
  getWizard,
}: PropsWithChildren<{
  wizard: ReturnType<typeof createWizardClient>;
  disconnect: () => void;
  getWizard: (name?: string) => ReturnType<typeof createWizardClient>;
}>) => {
  useEffect(() => {
    return disconnect;
  }, []);
  return (
    <WizardContext.Provider
      value={{
        wizard,
        getWizard,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

WizardProvider.Step = ({
  children,
  onNext,
  onPrev,
  onFail,
  onFinish,
}: PropsWithChildren<IStepProps>) => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }
  // useEffect(() => {
  //   const unsubscribe = context.subscribe({
  //     scope: WIZARD_SCOPE,
  //     eventName: WizardEvents.ON_NEXT,
  //     callback: ({ payload }: { payload: IOnNextOnPrevEventPayload }) => {
  //       onNext ? onNext(payload) : payload.resolve();
  //     },
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // });
  // useEffect(() => {
  //   const unsubscribe = context.subscribe({
  //     scope: WIZARD_SCOPE,
  //     eventName: WizardEvents.ON_PREV,
  //     callback: ({ payload }: { payload: IOnNextOnPrevEventPayload }) => {
  //       onPrev ? onPrev(payload) : payload.resolve();
  //     },
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // });

  // // Subscribe to FAIL_CHANGE_STEP event based on onFail prop passed to Step component
  // useEffect(() => {
  //   const unsubscribe = context.subscribe({
  //     scope: WIZARD_SCOPE,
  //     eventName: WizardEvents.FAIL_CHANGE_STEP,
  //     callback: ({ payload }: { payload: IFailChangeStepEventPayload }) => {
  //       if (onFail) {
  //         onFail(payload);
  //       }
  //     },
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // });

  // useEffect(() => {
  //   const unsubscribe = context.subscribe({
  //     scope: WIZARD_SCOPE,
  //     eventName: WizardEvents.ON_FINISH,
  //     callback: ({ payload }: { payload: any }) => {
  //       if (onFinish) {
  //         onFinish(payload);
  //       }
  //     },
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // });
  return <>{children}</>;
};

export { WizardContext, WizardProvider };
