import { useContext } from "react";
import { Context } from "./WizzardProvider";
import { useSubscriber } from "./useSubscribe";
import { useActiveStep } from "./useActiveStep";

const useStepParams = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }
  const { name: step } = useActiveStep();
  const isCompleted = useSubscriber(
    {
      eventName: "stepCompletionChanged",
      scope: "wizard:step",
    },
    () => context.getStepEntityByStepName(step).isCompleted
  );
  const status = useSubscriber(
    {
      eventName: "stepStatusChanged",
      scope: "wizard:step",
    },
    () => context.getStepEntityByStepName(step).status
  );
  console.log("isCompleted", isCompleted);
  console.log("status", status);
  return {
    isCompleted,
    status,
  };
};

export { useStepParams };
