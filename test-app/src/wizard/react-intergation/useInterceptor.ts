import { useContext, useEffect } from "react";
import { Context } from "./WizzardProvider";
import { WIZARD_SCOPE, type IOnNextOnPrevEventPayload } from "../types";

const useInterceptor = ({
  eventName,
  callback,
}: {
  eventName: "onNext" | "onPrev" | "onFinish";
  callback: (data: IOnNextOnPrevEventPayload) => any;
}) => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }

  useEffect(() => {
    context.interceptor({
      scope: WIZARD_SCOPE,
      eventName,
      callback: (data) => {
        return {
          ...data,
          actionMeta: {
            ...data.actionMeta,
            interceptor: { ...callback(data.actionMeta.interceptor) },
          },
        };
      },
    });
  });
};

export { useInterceptor };
