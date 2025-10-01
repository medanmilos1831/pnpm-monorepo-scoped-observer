import { useContext } from "react";
import { Context } from "./WizzardProvider";
import { useSubscriber } from "./useSubscribe";
import { WizardEvents, WizardScopes } from "../types";
import { useStep } from "./useStep";

const useNavigation = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }

  const activeSteps = useSubscriber(
    {
      eventName: WizardEvents.ON_UPDATE_STEPS,
      scope: WizardScopes.COMMANDS,
    },
    context.getActiveSteps
  );
  useStep();
  return {
    activeSteps,
    activeStepsLength: activeSteps.length,
    activeStep: context.getActiveStep(),
  };
};

export { useNavigation };
