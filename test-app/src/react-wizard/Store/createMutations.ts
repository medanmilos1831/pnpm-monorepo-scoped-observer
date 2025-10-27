import type { createObserver } from "../observer";
import { WizardPublicEvents } from "../types";
import { createState } from "./createState";

export function createMutations(
  state: ReturnType<typeof createState>,
  observer: ReturnType<typeof createObserver>
) {
  return {
    changeStep: (step: string) => {
      state.activeStep = step;
      state.isLast = state.steps.length - 1 === state.steps.indexOf(step);
      state.isFirst = state.steps.indexOf(step) === 0;
    },
    updateSteps(callback: (steps: string[]) => string[]) {
      state.steps = callback(state.steps);
      observer.dispatch(WizardPublicEvents.ON_STEPS_UPDATE);
    },
    setActiveStep(stepName: string) {
      state.activeStep = stepName;
    },
    reset() {
      state.steps = [...state.__INTERNAL__STEPS];
      this.changeStep(state.__INTERNAL__ACTIVE_STEP);
      observer.dispatch(WizardPublicEvents.ON_RESET);
      observer.dispatch(WizardPublicEvents.ON_STEPS_UPDATE);
    },
  };
}
