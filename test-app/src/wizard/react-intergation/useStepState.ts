import { useContext } from "react";
import { useSubscriber } from "./useSubscribe";
import { Context } from "./WizzardProvider";

const useStepState = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }
  return useSubscriber(
    { eventName: "mutateStepState", scope: "wizard:step" },
    () => context.getStepEntity().state
  );
};

export { useStepState };
