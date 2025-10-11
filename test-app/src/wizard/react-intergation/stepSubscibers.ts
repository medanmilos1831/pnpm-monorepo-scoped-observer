import { useContext, useEffect } from "react";
import { WizardContext } from "./WizardProvider";
import {
  WizardEvents,
  type IOnNextOnPrevEventPayload,
  type IFailChangeStepEventPayload,
  WIZARD_SCOPE,
} from "../types";
import { createEventName } from "../utils";

const useOnNext = (onNext?: (payload: IOnNextOnPrevEventPayload) => void) => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }
  const { observer } = context;
  useEffect(() => {
    const unsubscribe = observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: createEventName(context.name, WizardEvents.ON_NEXT),
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
  const { observer } = context;
  useEffect(() => {
    const unsubscribe = observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: createEventName(context.name, WizardEvents.ON_PREV),
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
  const { observer } = context;
  useEffect(() => {
    const unsubscribe = observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: createEventName(context.name, WizardEvents.FAIL_CHANGE_STEP),
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
  const { observer } = context;
  useEffect(() => {
    const unsubscribe = observer.subscribe({
      scope: WIZARD_SCOPE,
      eventName: createEventName(context.name, WizardEvents.ON_FINISH),
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
