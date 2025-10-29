import {
  stepMiddlewares,
  wizardCommands,
  WizardInternalEvents,
} from "../../types";
import { createNavigationManager } from "./createNavigationManager";
import type { createStateManager } from "./StateManager/createStateManager";
import type { createObserver } from "../../observer";

const createCommands = (
  stateManager: ReturnType<typeof createStateManager>,
  navigationManager: ReturnType<typeof createNavigationManager>,
  observer: ReturnType<typeof createObserver>
) => {
  return {
    reset: () => {
      navigationManager.navigate({
        command: wizardCommands.GO_TO_STEP,
        toStep: stateManager.state.__INTERNAL__ACTIVE_STEP,
        payload: undefined,
        isReset: true,
        middleware: null,
      });
    },
    next: (payload?: any) => {
      navigationManager.navigate({
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
      navigationManager.navigate({
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

      navigationManager.navigate({
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
      if (navigationManager.isLocked()) {
        console.warn("Navigation is locked");
        return;
      }
      stateManager.mutations.updateSteps(callback);
      observer.dispatch(WizardInternalEvents.ON_STEPS_UPDATE);
    },
  };
};

export { createCommands };
