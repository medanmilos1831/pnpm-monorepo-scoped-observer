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
  getters: ReturnType<typeof createGetters>,
  entityObserver: ReturnType<typeof createObserver>,
  step: ReturnType<typeof createStep>
) {
  return {
    changeStep: (step: string) => {
      state.activeStep = step;
      state.isLast = state.steps.length - 1 === state.steps.indexOf(step);
      state.isFirst = state.steps.indexOf(step) === 0;
    },
    // navigate: (obj: {
    //   command: `${commandType}`;
    //   stepName?: string;
    //   payload?: any;
    // }) => {
    //   if (obj.command === commandType.GO_TO_STEP && !obj.stepName) {
    //     return;
    //   }
    //   if (
    //     obj.command === commandType.GO_TO_STEP &&
    //     obj.stepName === state.activeStep
    //   ) {
    //     return;
    //   }
    //   let command = obj.command as `${commandType}`;
    //   let stepName: string | null = obj.stepName ?? null;
    //   let payload = obj.payload;
    //   if (command === commandType.NEXT || command === commandType.PREVIOUS) {
    //     stepName = getters.getStepByCommand({ command });
    //   }
    //   let data = {
    //     command,
    //     stepName,
    //     payload,
    //     clientProp: (() => {
    //       if (command === commandType.NEXT) {
    //         return "onNext" as const;
    //       }
    //       if (command === commandType.PREVIOUS) {
    //         return "onPrevious" as const;
    //       }
    //       const currentStepIndex = state.steps.indexOf(state.activeStep);
    //       const targetStepIndex = state.steps.indexOf(stepName!);
    //       return targetStepIndex > currentStepIndex ? "onNext" : "onPrevious";
    //     })(),
    //   };
    //   console.log("data", data);
    //   console.log("stepConfiguration", step.getStep());
    //   return data;
    //   // transitionWrapper(data);
    // },
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
