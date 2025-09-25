import { useContext } from "react";
import { useSubscriber } from "./useSubscribe";
import { Context } from "./WizzardProvider";

const useOnStepChange = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }
  const onStepChange = useSubscriber(
    { eventName: "changeStep" },
    context.getActiveStep
  );
  return onStepChange;
};

export { useOnStepChange };
