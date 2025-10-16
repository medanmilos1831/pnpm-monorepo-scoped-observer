import { useContext, useState, useSyncExternalStore } from "react";
import { WizardEvents } from "../Store/Entity/types";
import { WizardContext } from "./WizardProvider";
import { useWizardClient } from "./WizardClient/WizardClientProvider";

const useStep = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardContext not found");
  }
  const store = useWizardClient();
  const client = store.getClient(context.id);
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

export { useStep };
