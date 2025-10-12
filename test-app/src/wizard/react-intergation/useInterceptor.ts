import { useContext, useEffect } from "react";
import { WizardContext } from "./WizardProvider";
import { WIZARD_SCOPE, type IOnNextOnPrevEventPayload } from "../types";

const useInterceptor = ({
  eventName,
  callback,
}: {
  eventName: "onNext" | "onPrev" | "onFinish";
  callback: (data: IOnNextOnPrevEventPayload) => any;
}) => {
  const context = useContext(WizardContext)!;
  if (!context) {
    throw new Error("WizardProvider not found");
  }
  useEffect(() => {
    context.client.interceptor({
      scope: WIZARD_SCOPE,
      eventName,
      callback: (data: IOnNextOnPrevEventPayload) => {
        return {
          ...data,
          actionMeta: {
            ...data.actionMeta,
            interceptor: { ...callback((data.actionMeta as any).interceptor) },
          },
        };
      },
    });
  });
};

export { useInterceptor };
