import { useContext } from "react";
import { Context } from "./WizzardProvider";
import { useSubscriber } from "./useSubscribe";
import { WizardScopes } from "../types";

const useNavigation = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }

  const activeSteps = useSubscriber(
    {
      eventName: "onUpdateSteps",
      scope: WizardScopes.COMMANDS,
    },
    () => {
      console.log("ACTIVE STEPS", context.activeSteps);
      return context.activeSteps;
    }
  );
  return {
    activeSteps,
  };
};

export { useNavigation };
