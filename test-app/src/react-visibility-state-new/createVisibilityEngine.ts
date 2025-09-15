import type { VISIBILITY_STATE } from "./types";
import { VisibilityEngine } from "./VisibilityEngine";

/**
 * Factory function to create a new VisibilityEngine.
 * This is a convenience function that creates and returns a new VisibilityEngine
 * with the specified name and initial state.
 *
 * @param {string} name - Unique identifier for the visibility engine
 * @param {VISIBILITY_STATE} initState - Initial state of the visibility engine
 * @returns {VisibilityEngine} New visibility engine
 *
 * @example
 * ```tsx
 * // Create a new visibility engine
 * const modalEngine = createVisibilityEngine("modal", "close");
 *
 * // Subscribe to state changes
 * const unsubscribe = modalEngine.subscribe(() => {
 *   console.log("Modal state:", modalEngine.getState());
 * });
 *
 * // Change state
 * modalEngine.dispatch({ value: "open", data: { title: "My Modal" } });
 *
 * // Clean up
 * unsubscribe();
 * ```
 */
const createVisibilityEngine = (name: string, initState: VISIBILITY_STATE) => {
  const engine = new VisibilityEngine(name, initState);
  return engine;
};

export { createVisibilityEngine };
