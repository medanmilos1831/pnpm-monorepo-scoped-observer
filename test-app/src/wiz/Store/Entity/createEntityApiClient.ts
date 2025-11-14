import { createWizardState } from "./createWizardState";
import { createWizardModules } from "./createWizardModules";
import type { IWizardConfig, WizardPublicEventsType } from "../../types";
import { createModuleInstance } from "../../core/createModuleInstance";
import { createObserver } from "../../core/observer";
import { WIZARD_OBSERVER_SCOPE } from "../../types";

/**
 * Creates a complete wizard entity with state management, modules, and API client.
 *
 * This is the composition root for a wizard entity, combining:
 * - State manager (domain state, mutations, getters)
 * - Observer (event system for inter-module communication)
 * - Modules (commands, addEventListener)
 * - API client (public interface for React integration)
 *
 * @param props - Wizard configuration
 * @param props.id - Unique identifier for this wizard instance
 * @param props.steps - Array of step identifiers
 * @param props.activeStep - Initial active step identifier
 * @param props.onFinish - Optional callback when wizard finishes
 * @param props.onReset - Optional callback when wizard resets
 *
 * @returns Entity API client with access to state, modules, and public API
 *
 * @example
 * ```ts
 * const entity = createEntityApiClient({
 *   id: "wizard-1",
 *   steps: ["step1", "step2", "step3"],
 *   activeStep: "step1"
 * });
 *
 * // Access public API
 * const api = entity.api();
 * const commands = api.getCommands();
 * commands.next();
 *
 * // Subscribe to events
 * api.addEventListener("ON_STEP_CHANGE", (payload) => {
 *   // Handle step change
 * });
 * ```
 */
const createEntityApiClient = (props: IWizardConfig) => {
  const stateManager = createWizardState(props);
  const observer = createObserver(WIZARD_OBSERVER_SCOPE);
  const modules = createWizardModules({
    stateManager: stateManager,
    observer,
  });
  const obj = {
    stateManager,
    modules,
    observer,
  };

  return createModuleInstance(obj, {
    /**
     * API module providing access to wizard state, commands, and events.
     *
     * @param value - Entity composition (stateManager, modules, observer)
     * @returns API object with getters, commands, and event subscription
     */
    api(value) {
      const state = value.stateManager;
      const getters = state.getters;
      const commands = value.modules.commands;

      // Define addEventListener once to reuse
      const addEventListener = (
        event: `${WizardPublicEventsType}`,
        callback: (payload: any) => void
      ) => {
        return value.observer.subscribe(event, ({ payload }) => {
          callback(payload);
        });
      };

      return {
        /**
         * Gets the mutations object for direct state modifications.
         *
         * @returns Mutations object with methods to change wizard state
         */
        getMutations: () => value.stateManager.mutations,

        /**
         * Gets the getters object for read-only state access.
         *
         * @returns Getters object with computed state values
         */
        getGetters: () => value.stateManager.getters,

        /**
         * Gets the commands object for wizard navigation control.
         *
         * @returns Commands object with methods: next, previous, reset, goToStep, updateSteps
         */
        getCommands: () => value.modules.commands,

        /**
         * Subscribes to public wizard events.
         *
         * @param event - Event name (e.g., "ON_STEP_CHANGE", "ON_FINISH")
         * @param callback - Callback function receiving event payload
         * @returns Unsubscribe function
         *
         * @example
         * ```ts
         * const unsubscribe = api.addEventListener("ON_STEP_CHANGE", (payload) => {
         *   // Handle step change
         * });
         * ```
         */
        addEventListener,

        /**
         * Gets the internal observer subscribe method for internal events.
         *
         * @returns Observer subscribe function for internal events
         */
        getSubscribeInternal: () => value.observer.subscribe,

        /**
         * Gets the client entity interface with commands, events, and getters.
         *
         * @returns Client entity object for external access
         */
        getClientEntity: () => {
          return {
            addEventListener,
            commands,
            getters,
          };
        },

        /**
         * Gets the client state snapshot with current wizard metrics.
         *
         * @returns Client state object with activeStep, nextStep, previousStep, etc.
         */
        getClient: () => {
          return {
            activeStep: state.getters.getActiveStep(),
            nextStep: state.getters.getNextStep(),
            previousStep: state.getters.getPreviousStep(),
            isLast: state.getters.isLast(),
            isFirst: state.getters.isFirst(),
            steps: state.getters.getSteps(),
            wizardId: state.getters.getWizardId(),
          };
        },
      };
    },
  });
};

export { createEntityApiClient };
