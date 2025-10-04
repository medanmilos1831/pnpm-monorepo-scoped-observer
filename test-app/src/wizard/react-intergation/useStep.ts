import { useContext } from "react";
import { Context } from "./Wizzard";
import { useSubscriber } from "./useSubscribe";
import { WizardEvents, WIZARD_SCOPE } from "../types";

const useStep = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("WizzardProvider not found");
  }

  // Current step name (reactive)
  console.log("context", context);
  const stepName = useSubscriber(
    {
      eventName: WizardEvents.CHANGE_STEP,
      scope: WIZARD_SCOPE,
    },
    context.getActiveStep
  );

  return {
    // Step info
    stepName,
    activeStep: context.getActiveStep(),

    // Steps list
    activeSteps: context.getActiveSteps(),
    activeStepsLength: context.getActiveSteps().length,

    // Step position
    isLast: context.getIsLast(),
    isFirst: context.getIsFirst(),
  };
};

export { useStep };
