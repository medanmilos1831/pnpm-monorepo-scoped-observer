import { useContext, useState, useSyncExternalStore } from "react";
import { WizardEvents } from "../../Store/types";
import { WizardContext } from "../Scroll/ScrollProvider";
import { useWizard } from "./useWizard";

const useWizardStep = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardContext not found");
  }
  const client = useWizard(context.id)!;
  const [subsciber, __] = useState(() => (notify: () => void) => {
    return client.subscribe(WizardEvents.ON_STEP_CHANGE, () => {
      notify();
    });
  });
  const stepName = useSyncExternalStore(subsciber, client.getActiveStep);
  return {
    stepName,
    steps: client.getSteps(),
    wizardId: client.getWizardId(),
    isLast: client.isLast(),
    isFirst: client.isFirst(),
  };
};

export { useWizardStep };
