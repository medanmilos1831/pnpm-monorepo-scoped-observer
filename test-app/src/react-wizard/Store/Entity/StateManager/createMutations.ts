import { createState } from "./createState";

export function createMutations(state: ReturnType<typeof createState>) {
  return {
    changeStep: (step: string) => {
      state.activeStep = step;
      state.isLast = state.steps.length - 1 === state.steps.indexOf(step);
      state.isFirst = state.steps.indexOf(step) === 0;
    },
    updateSteps(callback: (steps: string[]) => string[]) {
      state.steps = [...new Set(callback(state.steps))];
      state.isLast =
        state.steps.length - 1 === state.steps.indexOf(state.activeStep);
      state.isFirst = state.steps.indexOf(state.activeStep) === 0;
    },
    reset() {
      state.steps = [...state.__INTERNAL__STEPS];
      state.activeStep = state.__INTERNAL__ACTIVE_STEP;
      state.isLast =
        state.steps.length - 1 === state.steps.indexOf(state.activeStep);
      state.isFirst = state.steps.indexOf(state.activeStep) === 0;
    },
  };
}
