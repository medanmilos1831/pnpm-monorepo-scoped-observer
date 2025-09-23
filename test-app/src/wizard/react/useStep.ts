import { useContext } from "react";
import { WIZARD_EVENTS } from "../types";
import { Context } from "./Provider";
import { useSubscriber } from "./useSubscriber";

export const useStep = () => {
  const context = useContext(Context)!;
  const state = useSubscriber(
    { eventName: WIZARD_EVENTS.STEP_CHANGED },
    context.getActiveStep
  );
  return {
    step: state,
    isFirst: context.getIsFirst(),
    isLast: context.getIsLast(),
  };
};

export { Context };
