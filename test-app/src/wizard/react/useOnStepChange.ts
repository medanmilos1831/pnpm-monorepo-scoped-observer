import { useContext } from "react";
import { WIZARD_EVENTS } from "../types";
import { Context } from "./Provider";
import { useSubscriber } from "./useSubscriber";

export const useOnStepChange = (selector: any) => {
  const context = useContext(Context)!;
  const state = useSubscriber(
    { eventName: WIZARD_EVENTS.STEP_CHANGED },
    context.getActiveStep
  );
  return selector(context.getState());
};
