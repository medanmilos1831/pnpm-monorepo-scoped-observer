import { WizardEvents } from "../../wizard/Store/types";
import { WizardCommands } from "../types";
import { stateFn } from "./state";
import { gettersFn } from "./getters";

export function mutationsFn(
  state: ReturnType<typeof stateFn>,
  getters: ReturnType<typeof gettersFn>
) {
  function transition({
    command,
    stepName,
  }: {
    command: WizardCommands;
    stepName?: string;
  }) {
    let toStep = stepName ? stepName : getters.getStepByCommand({ command })!;
    return {
      toStep,
      action: () => {
        const prop = command === WizardCommands.NEXT ? "onNext" : "onPrevious";
        if (state.steps[prop]) {
          state.steps[prop]({
            updateSteps: (callback: (steps: string[]) => string[]) => {
              const updatedSteps = callback(state.steps);
              state.steps = [...new Set(updatedSteps)];
              toStep = getters.getStepByCommand({ command })!;
            },
            activeStep: state.activeStep,
            toStep: getters.getStepByCommand({ command })!,
          });
        }
      },
      changeStep: () => {
        if (toStep) {
          state.activeStep = toStep;
          state.observer.dispatch(WizardEvents.ON_STEP_CHANGE);
        } else {
          if (command === WizardCommands.PREVIOUS) {
            return;
          }
          state.observer.dispatch(WizardEvents.ON_FINISH);
        }
      },
    };
  }

  function validationHandler(
    command: WizardCommands,
    transitionPlan: ReturnType<typeof transition>,
    obj?: any
  ) {
    const { action, changeStep, toStep } = transitionPlan;
    // if (step.validate) {
    //   step.validate({
    //     command,
    //     activeStep: state.activeStep,
    //     toStep: toStep,
    //     resolve: () => {
    //       action();
    //       changeStep();
    //     },
    //     ...obj,
    //   });
    //   return "validated";
    // }
    return "no_validation";
  }
  function transitionWrapper(
    command: WizardCommands,
    obj?: { actionType?: string },
    stepName?: string
  ) {
    const transitionPlan = transition({
      command,
      stepName,
    });
    const validationResult = validationHandler(command, transitionPlan, obj);
    if (validationResult === "validated") {
      return;
    }
    const { action, changeStep } = transitionPlan;

    action();
    changeStep();
  }
  return {
    changeStep: (step: string) => {
      state.activeStep = step;
      state.isLast = state.steps.length - 1 === state.steps.indexOf(step);
      state.isFirst = state.steps.indexOf(step) === 0;
    },
    goToStep: (stepName: string, obj?: { actionType?: string }) => {
      if (stepName === state.activeStep) {
        return;
      }
      const currentStepIndex = state.steps.indexOf(state.activeStep);
      const targetStepIndex = state.steps.indexOf(stepName);

      const command =
        targetStepIndex > currentStepIndex
          ? WizardCommands.NEXT
          : WizardCommands.PREVIOUS;
      transitionWrapper(command, obj, stepName);
    },
    next(obj?: { actionType?: string }) {
      transitionWrapper(WizardCommands.NEXT, obj);
    },
    previous: (obj?: { actionType?: string }) => {
      transitionWrapper(WizardCommands.PREVIOUS, obj);
    },
    reset() {
      state.steps = [...state.__INTERNAL__STEPS];
      this.changeStep(state.__INTERNAL__ACTIVE_STEP);
      state.observer.dispatch(WizardEvents.ON_RESET);
      state.observer.dispatch(WizardEvents.ON_STEP_CHANGE);
    },
  };
}
