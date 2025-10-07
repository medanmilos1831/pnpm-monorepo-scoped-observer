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
      eventName: context.eventNameBuilder(WizardEvents.STEP_WILDCARD),
      callback: ({ payload }: { payload: any }) => {
        const { eventName, ...rest } = payload;
        switch (eventName) {
          case WizardEvents.ON_NEXT:
            onNext
              ? onNext(rest as IOnNextOnPrevEventPayload)
              : payload.resolve();
            break;
          case WizardEvents.ON_PREV:
            onPrev
              ? onPrev(rest as IOnNextOnPrevEventPayload)
              : payload.resolve();
            break;
          case WizardEvents.FAIL_CHANGE_STEP:
            onFail?.(rest as IFailChangeStepEventPayload);
            break;
          case WizardEvents.ON_FINISH:
            onFinish?.(rest as any);
            break;
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
