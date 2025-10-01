import { useContext } from "react";
import { Context } from "./WizzardProvider";
import { useSubscriber } from "./useSubscribe";
import { WizardEvents, WizardScopes } from "../types";

const useStep = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }

  // Current step name (reactive)
  const stepName = useSubscriber(
    {
      eventName: WizardEvents.CHANGE_STEP,
      scope: WizardScopes.COMMANDS,
    },
    context.getActiveStep
  );

  // Active steps list (reactive)
  const activeSteps = useSubscriber(
    {
      eventName: WizardEvents.ON_UPDATE_STEPS,
      scope: WizardScopes.COMMANDS,
    },
    context.getActiveSteps
  );

  return {
    // Step info
    stepName,
    activeStep: context.getActiveStep(),
    
    // Steps list
    activeSteps,
    activeStepsLength: activeSteps.length,
    
    // Step position
    isLast: context.getIsLast(),
    isFirst: context.getIsFirst(),
  };
};

export { useStep };