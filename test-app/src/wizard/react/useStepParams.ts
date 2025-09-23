import { useContext, useSyncExternalStore } from "react";
import { Context } from "./useStep";
import { useSubscriber } from "./useSubscriber";
import { WIZARD_EVENTS } from "../types";

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
