import { createObserver } from "../observer";
import {
  wizardCommands,
  WizardPublicEvents,
  type IWizardStep,
  type navigateParamsType,
  type stepMiddlewaresType,
} from "../types";
import { createGetters } from "./createGetters";
import { createMutations } from "./createMutations";

const createNavigation = (
  getters: ReturnType<typeof createGetters>,
  mutations: ReturnType<typeof createMutations>,
  observer: ReturnType<typeof createObserver>
) => {
  let stepMiddleware: IWizardStep | undefined;
  let locked = false;
  return {
    navigate({
      command,
      stepName,
      isReset,
      payload,
      middleware,
    }: navigateParamsType) {
      // Handle reset command - directly apply transition without middleware
      if (isReset) {
        this.applyTransition({
          stepName,
          isReset: true,
        });
        return;
      }
      // Prevent navigation to same step
      if (
        command === wizardCommands.GO_TO_STEP &&
        stepName === getters.getActiveStep()
      ) {
        return;
      }
      // Prevent previous navigation when no previous step exists
      if (!stepName && command === wizardCommands.PREVIOUS) {
        return;
      }
      // Execute navigation with lock protection
      this.withLock(() =>
        this.execute({ command, stepName, isReset, payload, middleware })
      );
    },
    applyTransition: ({
      stepName,
      isReset,
    }: {
      stepName: string | null;
      isReset: boolean;
    }) => {
      if (stepName) {
        mutations.changeStep(stepName);
        if (isReset) {
          mutations.reset();
          observer.dispatch(WizardPublicEvents.ON_RESET);
        }
        stepMiddleware = undefined;
        observer.dispatch(WizardPublicEvents.ON_STEP_CHANGE);
        return;
      }
      observer.dispatch(WizardPublicEvents.ON_FINISH);
    },
    execute(params: navigateParamsType) {
      const obj = {
        middleware: params.middleware as stepMiddlewaresType,
        stepName: params.stepName as string,
        isReset: params.isReset,
      };
      // Check if current step has validation middleware
      if (stepMiddleware && stepMiddleware.validate) {
        // Call step's validate function with resolve callback
        stepMiddleware!.validate!({
          payload: params.payload,
          command: params.command,
          activeStep: getters.getActiveStep(),
          toStep: params.stepName!,
          resolve: () => {
            // Validation passed - proceed with navigation
            this.resolve(obj);
          },
        });
        return;
      }
      // No validation required - proceed directly with navigation
      this.resolve(obj);
    },
    resolve({
      middleware,
      stepName,
      isReset,
    }: {
      middleware: stepMiddlewaresType;
      stepName: navigateParamsType["stepName"];
      isReset: boolean;
    }) {
      if (!stepMiddleware) return;
      if (stepMiddleware[middleware]) {
        stepMiddleware[middleware]!({
          activeStep: getters.getActiveStep(),
          toStep: stepName as string,
        });
      }
      this.applyTransition({
        stepName,
        isReset,
      });
    },
    setStepMiddleware(props: IWizardStep) {
      stepMiddleware = props;
    },
    isLocked: () => {
      return locked;
    },
    withLock(callback: () => void) {
      if (locked) return;
      locked = true;
      callback();
      locked = false;
    },
  };
};

export { createNavigation };
