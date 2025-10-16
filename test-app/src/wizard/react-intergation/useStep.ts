import { useContext, useState, useSyncExternalStore } from "react";
import { WizardEvents } from "../Store/Entity/types";
import { WizardContext } from "./WizardProvider";

const useStep = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardContext not found");
  }
  const [subsciber, __] = useState(() => (notify: () => void) => {
    return context.client.subscribe(WizardEvents.ON_STEP_CHANGE, () => {
      notify();
    });
  });
  const stepName = useSyncExternalStore(
    subsciber,
    context.client.getActiveStep
  );
  return {
    stepName,
    steps: context.client.getSteps(),
    wizardId: context.client.getWizardId(),
    isLast: context.client.isLast(),
    isFirst: context.client.isFirst(),
  };
};

export { useStep };
