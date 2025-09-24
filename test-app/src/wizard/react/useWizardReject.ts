import { useContext, useEffect } from "react";
import type { WizardRejectCallback } from "../types";
import { WIZARD_EVENTS, WIZARD_SCOPE } from "../types";
import { Context } from "./Provider";

export const useWizardReject = (callback: WizardRejectCallback) => {
  const context = useContext(Context)!;
  useEffect(() => {
    const unsubscribe = context.subscribe({
      scope: WIZARD_SCOPE,
      eventName: WIZARD_EVENTS.STEP_REJECTED,
      callback,
    });
    return () => unsubscribe();
  }, []);
};
