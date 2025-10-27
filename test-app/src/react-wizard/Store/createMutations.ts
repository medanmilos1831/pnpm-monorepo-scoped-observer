import { WizardEvents } from "../../wizard/Store/types";
import type { createObserver } from "../observer";
import { createState } from "./createState";

export function createMutations(
  state: ReturnType<typeof createState>,
  entityObserver: ReturnType<typeof createObserver>
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
      entityObserver.dispatch(WizardEvents.ON_RESET);
      entityObserver.dispatch(WizardEvents.ON_STEP_CHANGE);
    },
  };
}
