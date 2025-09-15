import { createEngine } from "./createEngine";
import { Engine } from "./Engine";
import { ENGINE_STATE } from "./types";

/**
 * Creates a browser visibility implementation with engine management
 *
 * This factory function creates a visibility manager that acts as a "garage" for engines.
 * It provides centralized management of multiple visibility engines with reference counting
 * and automatic cleanup when engines are no longer needed.
 *
 * The implementation includes:
 * - Engine lifecycle management (create, start, stop, cleanup)
 * - Reference counting to prevent memory leaks
 * - Centralized engine storage and retrieval
 *
 * @returns Object with engine management methods
 *
 * @example
 * ```typescript
 * const browserVisibility = createBrowserVisibility();
 *
 * // Ensure an engine exists and get its interface
 * const engineInterface = browserVisibility.ensureEngine("my-engine", ENGINE_STATE.OFF);
 *
 * // Start the engine
 * browserVisibility.start("my-engine", { reason: "user-action" });
 *
 * // Stop the engine
 * browserVisibility.stop("my-engine");
 *
 * // Get direct access to engine instance
 * const engine = browserVisibility.getEngine("my-engine");
 * ```
 */
const createBrowserVisibility = () => {
  /** Map storing all active engines by name (the "garage") */
  const garage = new Map<string, Engine>();

  /** Map tracking reference count for each engine to manage cleanup */
  const refCount = new Map<string, number>();

  return {
    /**
     * Ensures an engine exists and returns its interface
     *
     * This method either retrieves an existing engine or creates a new one.
     * It also manages reference counting to ensure proper cleanup when
     * the engine is no longer needed.
     *
     * @param name - Unique identifier for the engine
     * @param initState - Initial state if creating a new engine
     * @returns Engine interface with subscribe, getState, getPayload, and disconnect methods
     *
     * @example
     * ```typescript
     * const engineInterface = browserVisibility.ensureEngine("tracker", ENGINE_STATE.OFF);
     *
     * // Subscribe to state changes
     * const unsubscribe = engineInterface.subscribe(() => {
     *   console.log("State:", engineInterface.getState());
     * });
     *
     * // Cleanup when done
     * engineInterface.disconnect();
     * ```
     */
    ensureEngine: (name: string, initState: ENGINE_STATE) => {
      let visibilityEngine = garage.get(name);

      // Create new engine if it doesn't exist
      if (!visibilityEngine) {
        visibilityEngine = createEngine(name, initState);
        garage.set(name, visibilityEngine);
        refCount.set(name, 0);
      }

      // Increment reference count
      refCount.set(name, (refCount.get(name) || 0) + 1);

      const { subscribe, getState, getPayload } = visibilityEngine;

      return {
        /**
         * Returns a cleanup function that decrements reference count
         * and removes engine from garage when count reaches zero
         */
        disconnect: () => {
          return () => {
            const currentCount = refCount.get(name) || 0;
            if (currentCount <= 1) {
              // Last reference - remove engine completely
              garage.delete(name);
              refCount.delete(name);
            } else {
              // Decrement reference count
              refCount.set(name, currentCount - 1);
            }
          };
        },
        subscribe,
        getState,
        getPayload,
      };
    },

    /**
     * Starts a visibility engine (turns it ON)
     *
     * This method finds the specified engine and dispatches an ON state change
     * with optional payload data.
     *
     * @param name - Engine identifier
     * @param payload - Optional data to associate with the state change
     * @throws Error if engine with specified name is not found
     *
     * @example
     * ```typescript
     * // Start engine with data
     * browserVisibility.start("my-engine", {
     *   reason: "user-clicked",
     *   timestamp: Date.now()
     * });
     *
     * // Start engine without data
     * browserVisibility.start("my-engine");
     * ```
     */
    start(name: string, payload?: any) {
      const visibilityEngine = garage.get(name);
      if (!visibilityEngine) {
        throw new Error(
          `Visibility engine with name "${name}" not found in garage`
        );
      }

      const { dispatch } = visibilityEngine;
      dispatch({
        value: ENGINE_STATE.ON,
        data: payload,
      });
    },

    /**
     * Stops a visibility engine (turns it OFF)
     *
     * This method finds the specified engine and dispatches an OFF state change
     * with optional payload data.
     *
     * @param name - Engine identifier
     * @param payload - Optional data to associate with the state change
     * @throws Error if engine with specified name is not found
     *
     * @example
     * ```typescript
     * // Stop engine with data
     * browserVisibility.stop("my-engine", {
     *   reason: "component-unmounted"
     * });
     *
     * // Stop engine without data
     * browserVisibility.stop("my-engine");
     * ```
     */
    stop: (name: string, payload?: any) => {
      const visibilityEngine = garage.get(name);
      if (!visibilityEngine) {
        throw new Error(
          `Visibility engine with name "${name}" not found in garage`
        );
      }

      const { dispatch } = visibilityEngine;
      dispatch({
        value: ENGINE_STATE.OFF,
        data: payload,
      });
    },

    /**
     * Gets direct access to an engine instance
     *
     * This method provides direct access to the engine instance for advanced usage.
     * Use with caution as it bypasses the reference counting system.
     *
     * @param name - Engine identifier
     * @returns Engine instance (throws if not found)
     *
     * @example
     * ```typescript
     * const engine = browserVisibility.getEngine("my-engine");
     *
     * // Direct engine manipulation
     * engine.dispatch({ value: ENGINE_STATE.ON, data: { custom: true } });
     * ```
     */
    getEngine: (name: string) => {
      return garage.get(name)!;
    },
  };
};

export { createBrowserVisibility };
