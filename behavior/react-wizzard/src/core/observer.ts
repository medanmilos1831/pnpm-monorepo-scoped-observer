import { createScopedObserver } from "@scoped-observer/core";

/**
 * Creates a scoped observer instance for event-driven communication.
 *
 * Wraps the core scoped observer with a simplified API that automatically
 * includes the scope in all dispatch and subscribe operations.
 *
 * @param scope - Unique scope identifier for this observer instance
 *
 * @returns Observer object with dispatch and subscribe methods
 *
 * @example
 * ```ts
 * const observer = createObserver("wizard-observer");
 *
 * // Dispatch an event
 * observer.dispatch("ON_STEP_CHANGE", { from: "step1", to: "step2" });
 *
 * // Subscribe to events
 * const unsubscribe = observer.subscribe("ON_STEP_CHANGE", (payload) => {
 *   console.log("Step changed:", payload);
 * });
 * ```
 */
const createObserver = (scope: string) => {
  const observer = createScopedObserver([
    {
      scope,
    },
  ]);

  return {
    /**
     * Dispatches an event with optional payload within the observer's scope.
     *
     * @param eventName - Event identifier
     * @param payload - Optional event payload data
     */
    dispatch: (eventName: string, payload?: any) => {
      observer.dispatch({
        scope,
        eventName,
        payload: payload || undefined,
      });
    },

    /**
     * Subscribes to events within the observer's scope.
     *
     * @param eventName - Event identifier to subscribe to
     * @param callback - Callback function receiving event payload
     * @returns Unsubscribe function to remove the subscription
     */
    subscribe: (eventName: string, callback: (payload: any) => void) => {
      return observer.subscribe({
        scope,
        eventName,
        callback,
      });
    },
  };
};

export { createObserver };
