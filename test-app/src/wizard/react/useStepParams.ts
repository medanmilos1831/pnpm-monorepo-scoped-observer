import { useContext, useSyncExternalStore } from "react";
import { Context } from "./useStep";
import { useSubscriber } from "./useSubscriber";
import { WIZARD_EVENTS } from "../types";

export const useStepParams = () => {
  const context = useContext(Context)!;
  const params = useSubscriber(
    { eventName: WIZARD_EVENTS.STEP_PARAMS_CHANGED },
    context.value.getStepParamsSnapshot
  );
  return {
    isCompleted: params.isCompleted,
    isChanged: params.isChanged,
    state: params.state,
  };
};
