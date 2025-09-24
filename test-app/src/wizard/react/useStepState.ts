import { useContext } from "react";
import { WIZARD_EVENTS } from "../types";

import { useSubscribe } from "./useSubscribe";
import { Context } from "./Provider";

export const useStepState = () => {
  const context = useContext(Context)!;

  const state = useSubscribe(
    { eventName: WIZARD_EVENTS.STEP_PARAMS_CHANGED },
    context.getStepState
  );
  return {
    state,
  };
};
