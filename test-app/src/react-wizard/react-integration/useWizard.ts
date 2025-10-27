import { useState, useSyncExternalStore } from "react";
import { createStore } from "../Store/createStore";

const useWizard = (store: ReturnType<typeof createStore>, id: string) => {
  const entity = store.getEntity(id);
  const [subsciber] = useState(() => (notify: () => void) => {
    return entity.addEventListener("onStepChange", () => {
      notify();
    });
  });
  useSyncExternalStore(subsciber, entity.getters.getActiveStep);
  return {
    activeStep: entity.getters.getActiveStep(),
    nextStep: entity.getters.getNextStep(),
    previousStep: entity.getters.getPreviousStep(),
    isLast: entity.getters.isLast(),
    isFirst: entity.getters.isFirst(),
    steps: entity.getters.getSteps(),
    wizardId: entity.getters.getWizardId(),
  };
};

export { useWizard };
