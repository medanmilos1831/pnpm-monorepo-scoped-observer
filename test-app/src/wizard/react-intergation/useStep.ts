import { useContext } from "react";
import { WizardEvents } from "../types";
import { WizardContext } from "./WizardProvider";
import { useSubscriber } from "./useSubscribe";
import { createEventName } from "../utils";

const useStep = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardProvider not found");
  }
  const { client } = context;
  const { getActiveStep, getActiveSteps, getIsLast, getIsFirst } = client;
  const stepName = useSubscriber(
    {
      eventName: createEventName(context.name, WizardEvents.CHANGE_STEP),
    },
    getActiveStep
  );

  return {
    stepName: stepName,
    activeStep: getActiveStep(),
    activeSteps: getActiveSteps(),
    activeStepsLength: getActiveSteps().length,
    isLast: getIsLast(),
    isFirst: getIsFirst(),
  };
};

export { useStep };
