import { useContext, useState, useSyncExternalStore } from "react";
import { WizardEvents } from "../types";
import { WizardContext } from "./WizardProvider";

const useStep = () => {
  const context = useContext(WizardContext);
  const [subsciber, __] = useState(() => (notify: () => void) => {
    return context.client.subscribe(
      WizardEvents.ON_STEP_CHANGE,
      (params: any) => {
        notify();
      }
    );
  });
  const stepName = useSyncExternalStore(
    subsciber,
    context.client.getActiveStep
  );
  return {
    stepName,
    steps: context.client.getSteps(),
    wizardId: context.client.getWizardId(),
  };
};

export { useStep };
