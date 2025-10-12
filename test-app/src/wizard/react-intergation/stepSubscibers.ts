import { useContext, useEffect } from "react";
import {
  WizardEvents,
  type IFailChangeStepEventPayload,
  type IOnNextOnPrevEventPayload,
} from "../types";
import { createEventName } from "../utils";
import { WizardContext } from "./WizardProvider";

const useOnNext = (onNext?: (payload: IOnNextOnPrevEventPayload) => void) => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }
  const { observer } = context;
  useEffect(() => {
    const unsubscribe = observer.subscribe({
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
      eventName: createEventName(context.name, WizardEvents.ON_FAIL),
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

export { useOnFail, useOnFinish, useOnNext, useOnPrev };
