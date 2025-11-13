import { createModuleInstance } from "../../core/createModuleInstance";
import type { createObserver } from "../../core/observer";
import {
  stepMiddlewares,
  wizardCommands,
  WizardInternalEvents,
} from "../../types";
import type { createWizardState } from "./createWizardState";
import { navigationService } from "./navigationService";

const createWizardModules = (props: {
  stateManager: ReturnType<typeof createWizardState>;
  observer: ReturnType<typeof createObserver>;
}) => {
  return createModuleInstance(props, {
    commands(value) {
      const service = navigationService(value);
      const { stateManager, observer } = value;
      return {
        reset: () => {
          service.navigate({
            command: wizardCommands.GO_TO_STEP,
            toStep: stateManager.state.__INTERNAL__ACTIVE_STEP,
            payload: undefined,
            isReset: true,
            middleware: null,
          });
        },
        next: (payload?: any) => {
          service.navigate({
            command: wizardCommands.NEXT,
            toStep: stateManager.getters.getStepByCommand({
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
              stateManager.getters.getStepByCommand({
                command: wizardCommands.PREVIOUS,
              }) ?? null,
            payload,
            isReset: false,
            middleware: stepMiddlewares.ON_PREVIOUS,
          });
        },
        goToStep: (toStep: string, payload?: any) => {
          const steps = stateManager.getters.getSteps();
          const currentStepIndex = steps.indexOf(
            stateManager.getters.getActiveStep()
          );
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
          stateManager.mutations.updateSteps(callback);
          observer.dispatch(WizardInternalEvents.ON_STEPS_UPDATE);
        },
      };
    },
  });
};

export { createWizardModules };
