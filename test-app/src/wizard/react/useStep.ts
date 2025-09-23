import { useContext } from "react";
import { WIZARD_EVENTS } from "../types";
import { Context } from "./Provider";
import { useSubscriber } from "./useSubscriber";

export const useStep = () => {
  const context = useContext(Context)!;
  const state = useSubscriber(
    { eventName: WIZARD_EVENTS.STEP_CHANGED },
    context.value.getActiveStep
  );
  return {
    step: state,
    isFirst: context.value.getIsFirst(),
    isLast: context.value.getIsLast(),
  };
};

export { Context };
