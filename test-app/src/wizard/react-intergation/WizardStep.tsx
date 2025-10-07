import { useContext, useEffect, type PropsWithChildren } from "react";
import {
  WIZARD_SCOPE,
  type IStepProps,
  WizardEvents,
  type IOnNextOnPrevEventPayload,
  type IFailChangeStepEventPayload,
} from "../types";
import { WizardContext } from "./WizardProvider";

const WizardStep = ({
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
  useEffect(() => {
    const unsubscribe = context.wizard.subscribe({
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
    const unsubscribe = context.wizard.subscribe({
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

  // // Subscribe to FAIL_CHANGE_STEP event based on onFail prop passed to Step component
  useEffect(() => {
    const unsubscribe = context.wizard.subscribe({
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
    const unsubscribe = context.wizard.subscribe({
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

export { WizardStep };
