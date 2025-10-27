import { commandType, type stepTransitionObject } from "../types";
import { createState } from "./createState";
import { createGetters } from "./createGetters";
import { createObserver } from "../observer";
import { createStep } from "./createStep";

const createNavigation = (
  state: ReturnType<typeof createState>,
  getters: ReturnType<typeof createGetters>,
  observer: ReturnType<typeof createObserver>,
  stepConfiguration: ReturnType<typeof createStep>
) => {
  let stateData: stepTransitionObject;

  return {
    action: () => {
      if (stateData.stepName) {
        state.activeStep = stateData.stepName;
        observer.dispatch("onStepChange");
      } else {
        if (stateData.command! === "previous") {
          return;
        }
        observer.dispatch("onFinish");
      }
    },
    pera() {
      return {
        activeStep: state.activeStep,
        toStep: stateData.stepName!,
        updateSteps: (callback: (steps: string[]) => string[]) => {
          const updatedSteps = callback(state.steps);
          state.steps = [...new Set(updatedSteps)];
        },
      };
    },
    navigate(obj: {
      command: `${commandType}`;
      stepName?: string;
      payload?: any;
    }) {
      const step = stepConfiguration.getStep();
      if (obj.command === commandType.GO_TO_STEP && !obj.stepName) {
        return;
      }
      if (
        obj.command === commandType.GO_TO_STEP &&
        obj.stepName === state.activeStep
      ) {
        return;
      }
      let command = obj.command as commandType;
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
      stateData = data;
      if (step) {
        if (step.validate) {
          if (step.validate) {
            step.validate({
              payload: data.payload,
              command: data.command,
              activeStep: state.activeStep,
              toStep: stepName!,
              resolve: () => {
                if (step[data.clientProp]) {
                  step[data.clientProp]!({
                    activeStep: state.activeStep,
                    toStep: stepName!,
                    updateSteps: (callback: (steps: string[]) => string[]) => {
                      const updatedSteps = callback(state.steps);
                      state.steps = [...new Set(updatedSteps)];
                    },
                  });
                }
                this.action();
              },
            });
          }
          return;
        }
        if (step[data.clientProp]) {
          step[data.clientProp]!({
            activeStep: state.activeStep,
            toStep: stepName!,
            updateSteps: (callback: (steps: string[]) => string[]) => {
              const updatedSteps = callback(state.steps);
              state.steps = [...new Set(updatedSteps)];
            },
          });
        }
        this.action();
      }
    },
  };
};

export { createNavigation };
