import { useContext, useEffect } from "react";
import { WizzardContext } from "./Wizzard";
import { WIZARD_SCOPE, type IOnNextOnPrevEventPayload } from "../types";

const useInterceptor = ({
  eventName,
  callback,
}: {
  eventName: "onNext" | "onPrev" | "onFinish";
  callback: (data: IOnNextOnPrevEventPayload) => any;
}) => {
  const context = useContext(WizzardContext)!;
  if (!context) {
    throw new Error("WizzardProvider not found");
  }
  useEffect(() => {
    context.interceptor({
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
