import { createModuleInstance } from "../../core/createModuleInstance";
import {
  stepMiddlewares,
  wizardCommands,
  WizardInternalEvents,
  type WizardPublicEventsType,
} from "../../types";
import type { createWizardState } from "./createWizardState";
import { navigationService } from "./navigationService";

const createWizardModules = (state: ReturnType<typeof createWizardState>) => {
  return createModuleInstance(state, {
    addEventListener(state) {
      return (
        event: `${WizardPublicEventsType}`,
        callback: (payload: any) => void
      ) => {
        return state.observer.subscribe(event, ({ payload }) => {
          callback(payload);
        });
      };
    },
    commands(state) {
      const service = navigationService(state);
      return {
        reset: () => {
          service.navigate({
            command: wizardCommands.GO_TO_STEP,
            toStep: state.state.__INTERNAL__ACTIVE_STEP,
            payload: undefined,
            isReset: true,
            middleware: null,
          });
        },
        next: (payload?: any) => {
          service.navigate({
            command: wizardCommands.NEXT,
            toStep: state.getters.getStepByCommand({
              command: wizardCommands.NEXT,
            }),
            payload,
            isReset: false,
            middleware: stepMiddlewares.ON_NEXT,
          });
        },
        previous: (payload?: any) => {
          service.navigate({
            command: wizardCommands.PREVIOUS,
            toStep:
              state.getters.getStepByCommand({
                command: wizardCommands.PREVIOUS,
              }) ?? null,
            payload,
            isReset: false,
            middleware: stepMiddlewares.ON_PREVIOUS,
          });
        },
        goToStep: (toStep: string, payload?: any) => {
          const steps = state.getters.getSteps();
          const currentStepIndex = steps.indexOf(state.getters.getActiveStep());
          const targetStepIndex = steps.indexOf(toStep);

          service.navigate({
            command: wizardCommands.GO_TO_STEP,
            toStep,
            payload,
            isReset: false,
            middleware:
              targetStepIndex > currentStepIndex
                ? stepMiddlewares.ON_NEXT
                : stepMiddlewares.ON_PREVIOUS,
          });
        },
        updateSteps: (callback: (steps: string[]) => string[]) => {
          if (service.isLocked()) {
            return;
          }
          state.mutations.updateSteps(callback);
          state.observer.dispatch(WizardInternalEvents.ON_STEPS_UPDATE);
        },
      };
    },
  });
};

export { createWizardModules };
