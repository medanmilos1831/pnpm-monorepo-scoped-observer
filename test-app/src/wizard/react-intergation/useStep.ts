import { useContext } from "react";
import { Context } from "./WizzardProvider";
import { useSubscriber } from "./useSubscribe";
import { WizardEvents, WizardScopes } from "../types";

const useStep = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }
  const stepName = useSubscriber(
    {
      eventName: WizardEvents.CHANGE_STEP,
      scope: WizardScopes.COMMANDS,
    },
    context.getActiveStep
  );
  return {
    stepName,
    isLast: context.getIsLast(),
    isFirst: context.getIsFirst(),
  };
};

export { useStep };
