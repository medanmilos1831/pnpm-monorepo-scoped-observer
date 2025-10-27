import { commandType } from "../types";
import { createState } from "./createState";

export function createGetters(state: ReturnType<typeof createState>) {
  return {
    getStepByCommand({ command }: { command: `${commandType}` }) {
      const step =
        command === commandType.NEXT
          ? this.getNextStep()
          : this.getPreviousStep();
      return step;
    },
    getNextStep: () => {
      const currentIndex = state.steps.indexOf(state.activeStep);
      const nextIndex = currentIndex + 1;

      if (nextIndex < state.steps.length) {
        return state.steps[nextIndex];
      }

      return null;
    },

    getPreviousStep: () => {
      const currentIndex = state.steps.indexOf(state.activeStep);
      const previousIndex = currentIndex - 1;

      if (previousIndex >= 0) {
        return state.steps[previousIndex];
      }

      return null;
    },
    getActiveStep: () => {
      return state.activeStep;
    },
    getSteps: () => {
      return state.steps;
    },
    getWizardId: () => {
      return state.id;
    },
    isLast: () => {
      return state.isLast;
    },
    isFirst: () => {
      return state.isFirst;
    },
  };
}
