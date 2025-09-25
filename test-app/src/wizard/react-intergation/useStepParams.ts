import { useContext } from "react";
import { Context } from "./WizzardProvider";
import { useSubscriber } from "./useSubscribe";
import { useOnStepChange } from "./useOnStepChange";

const useStepParams = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }
  const step = useOnStepChange();
  const isCompleted = useSubscriber(
    {
      eventName: "stepCompletionChanged",
      scope: "wizard:step",
    },
    () => context.getStepEntityByStepName(step).isCompleted
  );
  return {
    isCompleted,
  };
};

export { useStepParams };
