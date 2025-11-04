import type { ENGINE_STATE } from "./types";
import { Engine } from "./Engine";

/**
 * Factory function for creating new Engine instances
 *
 * This is a convenience function that creates and returns a new Engine instance
 * with the specified name and initial state. It provides a clean API for engine
 * creation without directly instantiating the Engine class.
 *
 * @param name - Unique identifier for the engine instance
 * @param initState - Initial state of the engine (ON or OFF)
 * @returns A new Engine instance ready for use
 *
 * @example
 * ```typescript
 * // Create a new engine that starts in OFF state
 * const myEngine = createEngine("visibility-tracker", ENGINE_STATE.OFF);
 *
 * // Create a new engine that starts in ON state
 * const activeEngine = createEngine("active-monitor", ENGINE_STATE.ON);
 *
 * // Use the engine
 * myEngine.subscribe(() => {
 *   console.log("Engine state:", myEngine.getState());
 * });
 * ```
 */
const createEngine = (name: string, initState: ENGINE_STATE) => {
  const engine = new Engine(name, initState);
  return engine;
};

export { createEngine };
