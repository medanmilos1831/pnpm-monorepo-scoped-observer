import { useContext } from "react";
import { Context } from "./WizzardProvider";
import { useSubscriber } from "./useSubscribe";

const useStep = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }
  const stepName = useSubscriber(
    {
      eventName: "changeStep",
      scope: "wizard:commands",
    },
    () => context.getStepEntity().name
  );
  return {
    stepName,
  };
};

export { useStep };
