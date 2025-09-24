import { useContext } from "react";
import { WIZARD_EVENTS, type WizardState } from "../types";
import { Context } from "./Provider";
import { useSubscribe } from "./useSubscribe";

export const useOnStepChange = <T>(selector: (state: WizardState) => T) => {
  const context = useContext(Context)!;
  useSubscribe(
    { eventName: WIZARD_EVENTS.STEP_CHANGED },
    context.getActiveStep
  );
  return selector(context.getState());
};
