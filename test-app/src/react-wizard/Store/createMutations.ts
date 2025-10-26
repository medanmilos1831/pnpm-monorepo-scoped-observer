import { WizardEvents } from "../../wizard/Store/types";
import {
  commandType,
  WizardCommands,
  type command,
  type stepTransitionObject,
} from "../types";
import { createState } from "./state";
import { createGetters } from "./createGetters";
import type { createObserver } from "../observer";

export function createMutations(
  state: ReturnType<typeof createState>,
  getters: ReturnType<typeof createGetters>,
  entityObserver: ReturnType<typeof createObserver>
) {
  function transition({
    command,
    stepName,
    payload,
    clientProp,
  }: stepTransitionObject) {
    // let toStep = stepName ? stepName : getters.getStepByCommand({ command })!;
    return {
      toStep: stepName,
      action: () => {
        // const prop = command === WizardCommands.NEXT ? "onNext" : "onPrevious";
        if (state.steps[clientProp]) {
          state.steps[clientProp]({
            updateSteps: (callback: (steps: string[]) => string[]) => {
              const updatedSteps = callback(state.steps);
              state.steps = [...new Set(updatedSteps)];
              // toStep = getters.getStepByCommand({ command })!;
            },
            activeStep: state.activeStep,
            toStep: stepName!,
          });
        }
      },
      changeStep: () => {
        if (stepName) {
          state.activeStep = stepName;
          entityObserver.dispatch("onStepChange");
        } else {
          if (command === "previous") {
            return;
          }
          entityObserver.dispatch("onFinish");
        }
      },
    };
  }

  function validationHandler(
    obj: stepTransitionObject,
    transitionPlan: ReturnType<typeof transition>
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
  function transitionWrapper(obj: stepTransitionObject) {
    const transitionPlan = transition(obj);
    console.log("transitionPlan", transitionPlan);
    const validationResult = validationHandler(obj, transitionPlan);
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
    navigate: (obj: {
      command: `${commandType}`;
      stepName?: string;
      payload?: any;
    }) => {
      if (obj.command === commandType.GO_TO_STEP && !obj.stepName) {
        return;
      }
      if (
        obj.command === commandType.GO_TO_STEP &&
        obj.stepName === state.activeStep
      ) {
        return;
      }
      let command = obj.command as `${commandType}`;
      let stepName: string | null = obj.stepName ?? null;
      let payload = obj.payload;
      if (command === commandType.NEXT || command === commandType.PREVIOUS) {
        stepName = getters.getStepByCommand({ command });
      }
      let data = {
        command,
        stepName,
        payload,
        clientProp: (() => {
          if (command === commandType.NEXT) {
            return "onNext" as const;
          }
          if (command === commandType.PREVIOUS) {
            return "onPrevious" as const;
          }
          const currentStepIndex = state.steps.indexOf(state.activeStep);
          const targetStepIndex = state.steps.indexOf(stepName!);
          return targetStepIndex > currentStepIndex ? "onNext" : "onPrevious";
        })(),
      };
      transitionWrapper(data);
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
      entityObserver.dispatch(WizardEvents.ON_RESET);
      entityObserver.dispatch(WizardEvents.ON_STEP_CHANGE);
    },
  };
}
