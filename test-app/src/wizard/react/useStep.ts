import { useContext } from "react";
import { WIZARD_EVENTS } from "../types";
import { Context } from "./Provider";
import { useSubscriber } from "./useSubscriber";

export const useStep = () => {
  const context = useContext(Context)!;
  const state = useSubscriber(
    { eventName: WIZARD_EVENTS.STEP_CHANGED },
    context.value.getActiveStepSnapshot
  );
  return {
    step: state,
    isFirst: context.value.isFirst(),
    isLast: context.value.isLast(),
  };
};

export { Context };
