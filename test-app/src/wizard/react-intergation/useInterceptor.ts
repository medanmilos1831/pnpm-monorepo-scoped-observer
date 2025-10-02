import { useContext, useEffect } from "react";
import { Context } from "./WizzardProvider";
import {
  WizardEvents,
  WizardScopes,
  type IOnNextOnPrevEventPayload,
} from "../types";

const useInterceptor = ({
  eventName,
  callback,
}: {
  eventName:
    | typeof WizardEvents.ON_NEXT
    | typeof WizardEvents.ON_PREV
    | typeof WizardEvents.ON_FINISH;
  callback: (data: IOnNextOnPrevEventPayload) => any;
}) => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }

  useEffect(() => {
    context.interceptor({
      scope: WizardScopes.COMMANDS,
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
