import { useState, useSyncExternalStore } from "react";
import { createStore } from "../Store/createStore";

const useWizard = (store: ReturnType<typeof createStore>, id: string) => {
  const entity = store.getEntity(id);
  const [subsciber] = useState(() => (notify: () => void) => {
    return entity.addEventListener("onStepChange", () => {
      notify();
    });
  });
  const [subsciberUpdateSteps] = useState(() => (notify: () => void) => {
    return entity.subscribe("onStepsUpdate", () => {
      notify();
    });
  });
  const [subsciberReset] = useState(() => (notify: () => void) => {
    return entity.addEventListener("onReset", () => {
      notify();
    });
  });
  useSyncExternalStore(subsciber, entity.stateManager.getters.getActiveStep);
  useSyncExternalStore(
    subsciberUpdateSteps,
    entity.stateManager.getters.getSteps
  );
  useSyncExternalStore(subsciberReset, entity.stateManager.getters.getSteps);
  return {
    activeStep: entity.stateManager.getters.getActiveStep(),
    nextStep: entity.stateManager.getters.getNextStep(),
    previousStep: entity.stateManager.getters.getPreviousStep(),
    isLast: entity.stateManager.getters.isLast(),
    isFirst: entity.stateManager.getters.isFirst(),
    steps: entity.stateManager.getters.getSteps(),
    wizardId: entity.stateManager.getters.getWizardId(),
  };
};

export { useWizard };
