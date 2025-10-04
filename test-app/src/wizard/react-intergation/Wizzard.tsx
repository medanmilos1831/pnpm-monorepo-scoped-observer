import {
  createContext,
  useContext,
  useEffect,
  type PropsWithChildren,
} from "react";
import { createWizardClient } from "../createWizardClient";
import {
  WIZARD_SCOPE,
  WizardEvents,
  type IFailChangeStepEventPayload,
  type IOnNextOnPrevEventPayload,
  type IStepProps,
  type IWizardConfig,
  type IWizardStepsConfig,
} from "../types";
import { useCreateWizzard } from "./useCreateWizzard";

const Context = createContext<
  ReturnType<typeof createWizardClient> | undefined
>(undefined);

const Wizzard = ({
  children,
  name,
  config,
  steps,
}: {
  children: React.ReactNode;
  name: string;
  config: IWizardConfig;
  steps: IWizardStepsConfig;
}) => {
  const { wizard, disconnect } = useCreateWizzard({ name, config, steps });
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);
  return <Context.Provider value={wizard}>{children}</Context.Provider>;
};

Wizzard.Step = ({
  children,
  onNext,
  onPrev,
  onFail,
  onFinish,
}: PropsWithChildren<IStepProps>) => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }
  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WizardEvents.ON_NEXT,
      callback: ({ payload }: { payload: IOnNextOnPrevEventPayload }) => {
        onNext ? onNext(payload) : payload.resolve();
      },
    });
    return () => {
      unsubscribe();
    };
  });
  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WizardEvents.ON_PREV,
      callback: ({ payload }: { payload: IOnNextOnPrevEventPayload }) => {
        onPrev ? onPrev(payload) : payload.resolve();
      },
    });
    return () => {
      unsubscribe();
    };
  });

  // Subscribe to FAIL_CHANGE_STEP event based on onFail prop passed to Step component
  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: WIZARD_SCOPE,
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

  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WizardEvents.ON_FINISH,
      callback: ({ payload }: { payload: any }) => {
        if (onFinish) {
          onFinish(payload);
        }
      },
    });
    return () => {
      unsubscribe();
    };
  });
  return <>{children}</>;
};

export { Context, Wizzard };
