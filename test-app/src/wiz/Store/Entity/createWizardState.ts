import { createStateManager } from "../../core/createStateManager";
import {
  WIZARD_STORE_SCOPE,
  wizardCommands,
  type IWizardConfig,
  type IWizardStep,
  type wizardCommandsType,
} from "../../types";

/**
 * Creates a wizard state manager with domain-specific state, mutations, and getters.
 *
 * Manages wizard navigation state including:
 * - Step management (active step, steps array, navigation flags)
 * - Step middleware for validation and lifecycle hooks
 * - Lock mechanism to prevent concurrent navigation
 *
 * Provides pure mutations for state transformations and getters for read-only access.
 *
 * @param props - Wizard configuration
 * @param props.id - Unique identifier for this wizard instance
 * @param props.steps - Array of step identifiers
 * @param props.activeStep - Initial active step identifier
 *
 * @returns State manager instance with state, mutations, and getters
 *
 * @example
 * ```ts
 * const stateManager = createWizardState({
 *   id: "wizard-1",
 *   steps: ["step1", "step2", "step3"],
 *   activeStep: "step1"
 * });
 *
 * // Change step
 * stateManager.mutations.changeStep("step2");
 *
 * // Get next step
 * const nextStep = stateManager.getters.getNextStep();
 * ```
 */
export function createWizardState(props: IWizardConfig) {
  return createStateManager({
    id: WIZARD_STORE_SCOPE,
    state: {
      id: props.id,
      steps: props.steps,
      activeStep: props.activeStep,
      isLast: props.steps.length - 1 === props.steps.indexOf(props.activeStep),
      isFirst: props.steps.indexOf(props.activeStep) === 0,
      __INTERNAL__STEPS: [...props.steps],
      __INTERNAL__ACTIVE_STEP: props.activeStep,
      stepMiddleware: undefined as IWizardStep | undefined,
      locked: false,
    },
    mutations(state) {
      return {
        /**
         * Sets the step middleware for validation and lifecycle hooks.
         *
         * @param stepMiddleware - Step middleware object or undefined to clear
         */
        setStepMiddleware: (stepMiddleware: IWizardStep | undefined) => {
          state.stepMiddleware = stepMiddleware;
        },

        /**
         * Sets the navigation lock state to prevent concurrent transitions.
         *
         * @param locked - Whether navigation is locked
         */
        setLocked: (locked: boolean) => {
          state.locked = locked;
        },

        /**
         * Changes the active step and updates navigation flags.
         *
         * Automatically updates `isLast` and `isFirst` flags based on step position.
         *
         * @param step - Step identifier to navigate to
         */
        changeStep: (step: string) => {
          state.activeStep = step;
          state.isLast = state.steps.length - 1 === state.steps.indexOf(step);
          state.isFirst = state.steps.indexOf(step) === 0;
        },

        /**
         * Updates the steps array using a callback function.
         *
         * Removes duplicates automatically and updates navigation flags.
         *
         * @param callback - Function that receives current steps and returns new steps
         */
        updateSteps(callback: (steps: string[]) => string[]) {
          state.steps = [...new Set(callback(state.steps))];
          state.isLast =
            state.steps.length - 1 === state.steps.indexOf(state.activeStep);
          state.isFirst = state.steps.indexOf(state.activeStep) === 0;
        },

        /**
         * Resets the wizard to initial state.
         *
         * Restores original steps array and active step from internal state.
         */
        reset() {
          state.steps = [...state.__INTERNAL__STEPS];
          state.activeStep = state.__INTERNAL__ACTIVE_STEP;
          state.isLast =
            state.steps.length - 1 === state.steps.indexOf(state.activeStep);
          state.isFirst = state.steps.indexOf(state.activeStep) === 0;
        },
      };
    },
    getters(state) {
      return {
        /**
         * Gets the step identifier based on navigation command.
         *
         * @param command - Navigation command (NEXT or PREVIOUS)
         * @returns Step identifier or null if navigation not possible
         */
        getStepByCommand({ command }: { command: wizardCommandsType }) {
          const step =
            command === wizardCommands.NEXT
              ? this.getNextStep()
              : this.getPreviousStep();
          return step;
        },

        /**
         * Gets the next step identifier in the steps array.
         *
         * @returns Next step identifier or null if already at last step
         */
        getNextStep: () => {
          const currentIndex = state.steps.indexOf(state.activeStep);
          const nextIndex = currentIndex + 1;

          if (nextIndex < state.steps.length) {
            return state.steps[nextIndex];
          }

          return null;
        },

        /**
         * Gets the previous step identifier in the steps array.
         *
         * @returns Previous step identifier or null if already at first step
         */
        getPreviousStep: () => {
          const currentIndex = state.steps.indexOf(state.activeStep);
          const previousIndex = currentIndex - 1;

          if (previousIndex >= 0) {
            return state.steps[previousIndex];
          }

          return null;
        },

        /**
         * Gets the currently active step identifier.
         *
         * @returns Active step identifier
         */
        getActiveStep: () => {
          return state.activeStep;
        },

        /**
         * Gets the array of all step identifiers.
         *
         * @returns Array of step identifiers
         */
        getSteps: () => {
          return state.steps;
        },

        /**
         * Gets the wizard instance identifier.
         *
         * @returns Wizard ID
         */
        getWizardId: () => {
          return state.id;
        },

        /**
         * Checks if the current step is the last step.
         *
         * @returns True if active step is the last step
         */
        isLast: () => {
          return state.isLast;
        },

        /**
         * Checks if the current step is the first step.
         *
         * @returns True if active step is the first step
         */
        isFirst: () => {
          return state.isFirst;
        },
      };
    },
  });
}
