import { createStateManager } from "../../core/createStateManager";
import {
  WIZARD_STORE_SCOPE,
  wizardCommands,
  type IWizardConfig,
  type IWizardStep,
  type wizardCommandsType,
} from "../../types";

export function createWizardState(props: IWizardConfig) {
  return createStateManager({
    id: WIZARD_STORE_SCOPE,
    state: {
      id: props.id,
      steps: props.steps,
      activeStep: props.activeStep,
      isLast: props.steps.length - 1 === props.steps.indexOf(props.activeStep),
      isFirst: props.steps.indexOf(props.activeStep) === 0,
      __INTERNAL__STEPS: [...props.steps],
      __INTERNAL__ACTIVE_STEP: props.activeStep,
      stepMiddleware: undefined as IWizardStep | undefined,
      locked: false,
    },
    mutations(state) {
      return {
        setStepMiddleware: (stepMiddleware: IWizardStep | undefined) => {
          state.stepMiddleware = stepMiddleware;
        },
        setLocked: (locked: boolean) => {
          state.locked = locked;
        },
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
    },
    getters(state) {
      return {
        getStepByCommand({ command }: { command: wizardCommandsType }) {
          const step =
            command === wizardCommands.NEXT
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
    },
  });
}
