import type { gettersFn } from "./Store/getters";

export function getWizardData(getters: ReturnType<typeof gettersFn>) {
  return {
    activeStep: getters.getActiveStep(),
    nextStep: getters.getNextStep(),
    previousStep: getters.getPreviousStep(),
    isLast: getters.isLast(),
    isFirst: getters.isFirst(),
    steps: getters.getSteps(),
    wizardId: getters.getWizardId(),
  };
}
