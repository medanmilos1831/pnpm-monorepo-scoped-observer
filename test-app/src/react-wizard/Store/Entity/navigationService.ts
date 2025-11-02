import {
  wizardCommands,
  WizardPublicEvents,
  type navigateParamsType,
  type stepMiddlewaresType,
  type wizardCommandsType,
} from "../../types";
import type { createWizardState } from "./createWizardState";

export const navigationService = (
  state: ReturnType<typeof createWizardState>
) => {
  const stepMiddleware = state.state.stepMiddleware;
  const locked = state.state.locked;
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
        toStep === state.getters.getActiveStep()
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
        let activeStep = state.getters.getActiveStep();
        state.mutations.changeStep(toStep);
        if (isReset) {
          state.mutations.reset();
          state.observer.dispatch(WizardPublicEvents.ON_RESET);
        }
        state.mutations.setStepMiddleware(undefined);
        state.observer.dispatch(WizardPublicEvents.ON_STEP_CHANGE, {
          to: toStep,
          from: activeStep,
          command,
        });
        return;
      }
      state.observer.dispatch(WizardPublicEvents.ON_FINISH);
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
          activeStep: state.getters.getActiveStep(),
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
          from: state.getters.getActiveStep(),
          to: toStep as string,
        });
      }
      this.applyTransition({
        toStep,
        isReset,
        command,
      });
    },
    // setStepMiddleware(props: IWizardStep) {
    //   stepMiddleware = props;
    // },
    isLocked: () => {
      return locked;
    },
    withLock(callback: () => void) {
      if (locked) return;
      state.mutations.setLocked(true);
      callback();
      state.mutations.setLocked(false);
    },
  };
};
