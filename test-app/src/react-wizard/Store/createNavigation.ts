import { createObserver } from "../observer";
import {
  wizardCommands,
  WizardPublicEvents,
  type IWizardStep,
  type navigateParamsType,
  type stepMiddlewaresType,
  type wizardCommandsType,
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
      toStep,
      isReset,
      payload,
      middleware,
    }: navigateParamsType) {
      // Handle reset command - directly apply transition without middleware
      if (isReset) {
        this.applyTransition({
          toStep,
          isReset: true,
          command,
        });
        return;
      }
      // Prevent navigation to same step
      if (
        command === wizardCommands.GO_TO_STEP &&
        toStep === getters.getActiveStep()
      ) {
        return;
      }
      // Prevent previous navigation when no previous step exists
      if (!toStep && command === wizardCommands.PREVIOUS) {
        return;
      }
      // Execute navigation with lock protection
      this.withLock(() =>
        this.execute({ command, toStep, isReset, payload, middleware })
      );
    },
    applyTransition: ({
      toStep,
      isReset,
      command,
    }: {
      toStep: string | null;
      isReset: boolean;
      command: wizardCommandsType;
    }) => {
      if (toStep) {
        mutations.changeStep(toStep);
        if (isReset) {
          mutations.reset();
          observer.dispatch(WizardPublicEvents.ON_RESET);
        }
        stepMiddleware = undefined;
        observer.dispatch(WizardPublicEvents.ON_STEP_CHANGE, {
          toStep,
          activeStep: getters.getActiveStep(),
          command,
        });
        return;
      }
      observer.dispatch(WizardPublicEvents.ON_FINISH);
    },
    execute(params: navigateParamsType) {
      const obj = {
        middleware: params.middleware as stepMiddlewaresType,
        toStep: params.toStep as string,
        isReset: params.isReset,
        command: params.command,
      };
      // Check if current step has validation middleware
      if (stepMiddleware && stepMiddleware.validate) {
        // Call step's validate function with resolve callback
        stepMiddleware!.validate!({
          payload: params.payload,
          command: params.command,
          activeStep: getters.getActiveStep(),
          toStep: params.toStep!,
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
      toStep,
      isReset,
      command,
    }: {
      middleware: stepMiddlewaresType;
      toStep: navigateParamsType["toStep"];
      isReset: boolean;
      command: wizardCommandsType;
    }) {
      if (stepMiddleware && stepMiddleware[middleware]) {
        stepMiddleware[middleware]!({
          activeStep: getters.getActiveStep(),
          toStep: toStep as string,
        });
      }
      this.applyTransition({
        toStep,
        isReset,
        command,
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
