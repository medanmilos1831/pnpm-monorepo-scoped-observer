import { useContext } from "react";
import { WizardContext } from "./WizardProvider";
import { useSubscriber } from "./useSubscribe";
import { WizardEvents, WIZARD_SCOPE } from "../types";

const useStep = (name?: string) => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }
  const entity = context.getWizard(name);

  const stepName = useSubscriber(
    {
      eventName: WizardEvents.CHANGE_STEP,
      scope: WIZARD_SCOPE,
    },
    entity.getActiveStep
  );

  return {
    stepName: stepName,
    activeStep: entity.getActiveStep(),
    activeSteps: entity.getActiveSteps(),
    activeStepsLength: entity.getActiveSteps().length,
    isLast: entity.getIsLast(),
    isFirst: entity.getIsFirst(),
  };
};

export { useStep };
