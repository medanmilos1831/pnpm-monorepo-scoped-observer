import { useContext, useEffect } from "react";
import { WizardContext } from "./WizardProvider";
import {
  WizardEvents,
  type IOnNextOnPrevEventPayload,
  type IFailChangeStepEventPayload,
} from "../types";

const useOnNext = (onNext?: (payload: IOnNextOnPrevEventPayload) => void) => {
  const context = useContext(WizardContext);
  console.log("useOnNext", context?.observer);
  if (!context) {
    throw new Error("WizardProvider not found");
  }
  useEffect(() => {
    const unsubscribe = context?.observer.subscribe({
      eventName: context.eventNameBuilder(WizardEvents.ON_NEXT),
      callback: ({ payload }: { payload: IOnNextOnPrevEventPayload }) => {
        onNext ? onNext(payload) : payload.resolve();
      },
    });
    return () => {
      unsubscribe();
    };
  });
};

const useOnPrev = (onPrev?: (payload: IOnNextOnPrevEventPayload) => void) => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }
  useEffect(() => {
    const unsubscribe = context.observer.subscribe({
      eventName: WizardEvents.ON_PREV,
      callback: ({ payload }: { payload: IOnNextOnPrevEventPayload }) => {
        onPrev ? onPrev(payload) : payload.resolve();
      },
    });
    return () => {
      unsubscribe();
    };
  });
};

const useOnFail = (onFail?: (payload: IFailChangeStepEventPayload) => void) => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }
  useEffect(() => {
    const unsubscribe = context.observer.subscribe({
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
};

const useOnFinish = (onFinish?: (payload: any) => void) => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }
  useEffect(() => {
    const unsubscribe = context.observer.subscribe({
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
};

export { useOnNext, useOnPrev, useOnFail, useOnFinish };
