import { useContext } from "react";
import { WIZARD_EVENTS } from "../types";

import { useSubscriber } from "./useSubscriber";
import { Context } from "./Provider";

export const useStepParams = () => {
  const context = useContext(Context)!;
  const isCompleted = useSubscriber(
    { eventName: WIZARD_EVENTS.STEP_PARAMS_CHANGED },
    context.getIsStepComplete
  );
  const isChanged = useSubscriber(
    { eventName: WIZARD_EVENTS.STEP_PARAMS_CHANGED },
    context.getIsStepChanged
  );
  const state = useSubscriber(
    { eventName: WIZARD_EVENTS.STEP_PARAMS_CHANGED },
    context.getStepState
  );
  return {
    isCompleted,
    isChanged,
    state,
  };
};
