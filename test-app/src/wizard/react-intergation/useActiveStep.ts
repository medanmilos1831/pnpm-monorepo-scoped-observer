import { useContext } from "react";
import { useSubscriber } from "./useSubscribe";
import { Context } from "./WizzardProvider";

const useActiveStep = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }
  const step = useSubscriber(
    { eventName: "changeStep" },
    context.getActiveStep
  );
  return context.getStepEntityByStepName(step);
};

export { useActiveStep };
