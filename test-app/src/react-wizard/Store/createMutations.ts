import { WizardEvents } from "../../wizard/Store/types";
import {
  commandType,
  WizardCommands,
  type stepTransitionObject,
} from "../types";
import { createState } from "./createState";
import { createGetters } from "./createGetters";
import type { createObserver } from "../observer";
import { createStep } from "./createStep";

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
    updateSteps(callback: (steps: string[]) => string[]) {
      const updatedSteps = callback(state.steps);
      state.steps = [...new Set(updatedSteps)];
    },
    setActiveStep(stepName: string) {
      state.activeStep = stepName;
    },
    goToStep: (stepName: string, obj?: { actionType?: string }) => {
      // if (stepName === state.activeStep) {
      //   return;
      // }
      // const currentStepIndex = state.steps.indexOf(state.activeStep);
      // const targetStepIndex = state.steps.indexOf(stepName);
      // const command =
      //   targetStepIndex > currentStepIndex
      //     ? WizardCommands.NEXT
      //     : WizardCommands.PREVIOUS;
      // transitionWrapper(command, obj, stepName);
    },
    next(obj?: { actionType?: string }) {
      // transitionWrapper(WizardCommands.NEXT, obj);
    },
    previous: (obj?: { actionType?: string }) => {
      // transitionWrapper(WizardCommands.PREVIOUS, obj);
    },
    reset() {
      state.steps = [...state.__INTERNAL__STEPS];
      this.changeStep(state.__INTERNAL__ACTIVE_STEP);
      entityObserver.dispatch(WizardEvents.ON_RESET);
      entityObserver.dispatch(WizardEvents.ON_STEP_CHANGE);
    },
  };
}
