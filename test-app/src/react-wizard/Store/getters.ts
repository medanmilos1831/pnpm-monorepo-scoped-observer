import { WizardCommands, WizardEvents } from "../types";
import { stateFn } from "./state";

export function gettersFn(state: ReturnType<typeof stateFn>) {
  return {
    subscribe: state.observer.subscribe,
    getStepByCommand({ command }: { command: WizardCommands }) {
      const step =
        command === WizardCommands.NEXT
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
    // on: (
    //   event:
    //     | WizardEvents.ON_RESET
    //     | WizardEvents.ON_FINISH
    //     | WizardEvents.ON_STEP_CHANGE,
    //   callback: (data: any) => void
    // ) => {
    //   switch (event) {
    //     case WizardEvents.ON_RESET:
    //       return state.observer.subscribe(WizardEvents.ON_RESET, callback);
    //     case WizardEvents.ON_FINISH:
    //       return state.observer.subscribe(WizardEvents.ON_FINISH, callback);
    //     case WizardEvents.ON_STEP_CHANGE:
    //       return state.observer.subscribe(
    //         WizardEvents.ON_STEP_CHANGE,
    //         callback
    //       );
    //     default:
    //       throw new Error("Unknown event: ${event}");
    //   }
    // },
  };
}
