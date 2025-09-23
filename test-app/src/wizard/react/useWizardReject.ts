import { useContext, useEffect } from "react";
import { Context } from "./useStep";
import type { WizardRejectCallback } from "../types";

export const useWizardReject = (cb: WizardRejectCallback) => {
  const context = useContext(Context)!;
  useEffect(() => {
    const unsubscribe = context.value.rejectSubscription(cb);
    return () => unsubscribe();
  }, []);
};
