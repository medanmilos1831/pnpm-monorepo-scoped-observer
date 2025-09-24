import { useContext, useEffect } from "react";

import { WIZARD_EVENTS, WIZARD_SCOPE } from "../types";
import { Context } from "./Provider";

export const useWizardReject = (callback: (message: string) => void) => {
  const context = useContext(Context)!;
  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_REJECTED,
      callback: ({ payload: message }: { payload: string }) => {
        callback(message);
      },
    });
    return () => unsubscribe();
  }, []);
};
