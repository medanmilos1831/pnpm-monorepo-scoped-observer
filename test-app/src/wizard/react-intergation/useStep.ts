import { useContext } from "react";
import { WizardContext } from "./WizardProvider";
import { useSubscriber } from "./useSubscribe";
import { WizardEvents, WIZARD_SCOPE } from "../types";

const useStep = (name?: string) => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }
  console.log("context", context);

  // Current step name (reactive)
  // const stepName = useSubscriber(
  //   {
  //     eventName: WizardEvents.CHANGE_STEP,
  //     scope: WIZARD_SCOPE,
  //   },
  //   context.getActiveStep
  // );

  return {
    // Step info
    // stepName,
    // activeStep: context.getActiveStep(),
    // // Steps list
    // activeSteps: context.getActiveSteps(),
    // activeStepsLength: context.getActiveSteps().length,
    // // Step position
    // isLast: context.getIsLast(),
    // isFirst: context.getIsFirst(),
  };
};

export { useStep };
