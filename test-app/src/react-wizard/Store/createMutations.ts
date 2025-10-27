import type { createObserver } from "../observer";
import { createState } from "./createState";
import { WizardEvents } from "../types";

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
    updateSteps(steps: string[]) {
      state.steps = steps;
    },
    setActiveStep(stepName: string) {
      state.activeStep = stepName;
    },
    reset() {
      state.steps = [...state.__INTERNAL__STEPS];
      this.changeStep(state.__INTERNAL__ACTIVE_STEP);
      observer.dispatch(WizardEvents.ON_RESET);
      observer.dispatch(WizardEvents.ON_STEP_CHANGE);
    },
  };
}
