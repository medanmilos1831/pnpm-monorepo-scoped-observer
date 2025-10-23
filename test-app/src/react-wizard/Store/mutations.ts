import { stateFn } from "./state";

export function mutations(state: ReturnType<typeof stateFn>) {
  return {
    changeStep: (step: string) => {
      state.activeStep = step;
      state.isLast = state.steps.length - 1 === state.steps.indexOf(step);
      state.isFirst = state.steps.indexOf(step) === 0;
    },
  };
}
