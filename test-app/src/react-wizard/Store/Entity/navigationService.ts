import type { createObserver } from "../../core/observer";
import {
  wizardCommands,
  WizardPublicEvents,
  type navigateParamsType,
  type stepMiddlewaresType,
  type wizardCommandsType,
} from "../../types";
import type { createWizardState } from "./createWizardState";

/**
 * Creates a navigation service for wizard step transitions.
 *
 * Handles wizard navigation with:
 * - Validation middleware support
 * - Step lifecycle hooks (onNext, onPrevious)
 * - Lock mechanism to prevent concurrent transitions
 * - Event dispatching for navigation lifecycle
 *
 * @param value - Service dependencies
 * @param value.stateManager - Wizard state manager with state, mutations, and getters
 * @param value.observer - Observer instance for event dispatching
 *
 * @returns Navigation service with methods for step navigation
 *
 * @example
 * ```ts
 * const service = navigationService({
 *   stateManager: wizardStateManager,
 *   observer: wizardObserver
 * });
 *
 * // Navigate to next step
 * service.navigate({
 *   command: wizardCommands.NEXT,
 *   toStep: "step2",
 *   payload: { data: "value" },
 *   isReset: false,
 *   middleware: stepMiddlewares.ON_NEXT
 * });
 * ```
 */
export const navigationService = (value: {
  stateManager: ReturnType<typeof createWizardState>;
  observer: ReturnType<typeof createObserver>;
}) => {
  const { stateManager, observer } = value;
  const stepMiddleware = stateManager.state.stepMiddleware;
  const locked = stateManager.state.locked;

  return {
    /**
     * Navigates to a wizard step with validation and middleware support.
     *
     * Handles navigation logic:
     * - Skips validation for reset commands
     * - Prevents navigation to same step
     * - Prevents navigation when locked
     * - Executes validation if step middleware exists
     * - Calls step lifecycle hooks (onNext/onPrevious)
     *
     * @param params - Navigation parameters
     * @param params.command - Navigation command (NEXT, PREVIOUS, GO_TO_STEP)
     * @param params.toStep - Target step identifier
     * @param params.isReset - Whether this is a reset operation
     * @param params.payload - Optional payload data for validation/middleware
     * @param params.middleware - Middleware type (ON_NEXT, ON_PREVIOUS)
     */
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
        toStep === stateManager.getters.getActiveStep()
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

    /**
     * Applies the step transition and dispatches events.
     *
     * Updates state, clears middleware, and dispatches public events:
     * - ON_STEP_CHANGE when transitioning to a step
     * - ON_RESET when resetting
     * - ON_FINISH when no more steps available
     *
     * @param params - Transition parameters
     * @param params.toStep - Target step identifier (null triggers ON_FINISH)
     * @param params.isReset - Whether this is a reset operation
     * @param params.command - Navigation command for event payload
     */
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
        let activeStep = stateManager.getters.getActiveStep();
        stateManager.mutations.changeStep(toStep);
        if (isReset) {
          stateManager.mutations.reset();
          observer.dispatch(WizardPublicEvents.ON_RESET);
        }
        stateManager.mutations.setStepMiddleware(undefined);
        observer.dispatch(WizardPublicEvents.ON_STEP_CHANGE, {
          to: toStep,
          from: activeStep,
          command,
        });
        return;
      }
      observer.dispatch(WizardPublicEvents.ON_FINISH);
    },

    /**
     * Executes navigation logic with validation support.
     *
     * Checks for step validation middleware:
     * - If validation exists, calls validate function with resolve callback
     * - If no validation, proceeds directly to resolve
     *
     * @param params - Navigation parameters
     */
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
          activeStep: stateManager.getters.getActiveStep(),
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

    /**
     * Resolves navigation by calling lifecycle hooks and applying transition.
     *
     * Calls step middleware hooks (onNext/onPrevious) if defined,
     * then applies the transition.
     *
     * @param params - Resolve parameters
     * @param params.middleware - Middleware type (ON_NEXT, ON_PREVIOUS)
     * @param params.toStep - Target step identifier
     * @param params.isReset - Whether this is a reset operation
     * @param params.command - Navigation command
     */
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
          from: stateManager.getters.getActiveStep(),
          to: toStep as string,
        });
      }
      this.applyTransition({
        toStep,
        isReset,
        command,
      });
    },

    /**
     * Checks if navigation is currently locked.
     *
     * @returns True if navigation is locked, false otherwise
     */
    isLocked: () => {
      return locked;
    },

    /**
     * Executes a callback with lock protection to prevent concurrent navigation.
     *
     * Sets lock before execution and releases it after, ensuring
     * only one navigation operation runs at a time.
     *
     * @param callback - Function to execute with lock protection
     */
    withLock(callback: () => void) {
      if (locked) return;
      stateManager.mutations.setLocked(true);
      callback();
      stateManager.mutations.setLocked(false);
    },
  };
};
