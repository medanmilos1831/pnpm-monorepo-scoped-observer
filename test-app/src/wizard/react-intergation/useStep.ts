import { useContext } from "react";
import { WizardContext } from "./WizardProvider";
import { useSubscriber } from "./useSubscribe";
import { WizardEvents, WIZARD_SCOPE } from "../types";

const useStep = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }

  const stepName = useSubscriber(
    {
      eventName: WizardEvents.CHANGE_STEP,
      scope: WIZARD_SCOPE,
    },
    context.wizard.getActiveStep
  );

  return {
    stepName: stepName,
    activeStep: context.wizard.getActiveStep(),
    activeSteps: context.wizard.getActiveSteps(),
    activeStepsLength: context.wizard.getActiveSteps().length,
    isLast: context.wizard.getIsLast(),
    isFirst: context.wizard.getIsFirst(),
  };
};

export { useStep };
