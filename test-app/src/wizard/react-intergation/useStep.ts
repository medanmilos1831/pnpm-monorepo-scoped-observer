import { useContext } from "react";
import { Context } from "./WizzardProvider";
import { useSubscriber } from "./useSubscribe";
import { WizardScopes } from "../types";

const useStep = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }
  const stepName = useSubscriber(
    {
      eventName: "changeStep",
      scope: WizardScopes.COMMANDS,
    },
    () => {
      return context.getStepEntity().name;
    }
  );
  return {
    stepName,
  };
};

export { useStep };
