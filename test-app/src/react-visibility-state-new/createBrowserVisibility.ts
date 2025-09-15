import { createVisibilityEngine } from "./createVisibilityEngine";
import { VisibilityEngine } from "./VisibilityEngine";
import { VISIBILITY_STATE } from "./types";

/**
 * Creates a browser visibility store that manages multiple visibility instances.
 * This store provides a centralized way to manage visibility states across your application
 * using a scoped observer pattern with reference counting to prevent memory leaks.
 *
 * @returns {Object} Browser visibility store with methods to manage visibility instances
 *
 * @example
 * ```tsx
 * const visibilityStore = createBrowserVisibility();
 *
 * // Start a visibility engine
 * const { disconnect, subscribe, getState, getPayload } = visibilityStore.startEngine("modal", "close");
 *
 * // Open the item
 * visibilityStore.open("modal", { title: "My Modal" });
 *
 * // Close the item
 * visibilityStore.close("modal");
 * ```
 */
const createBrowserVisibility = () => {
  // Internal store to hold visibility instances by name
  const store = new Map<string, VisibilityEngine>();
  // Reference counting to track how many components are using each visibility item
  const refCount = new Map<string, number>();

  return {
    /**
     * Starts a visibility engine with the given name and initial state.
     * If an engine with the same name already exists, it will be reused and reference count incremented.
     * This prevents memory leaks when multiple components use the same visibility engine.
     *
     * @param {string} name - Unique identifier for the visibility engine
     * @param {VISIBILITY_STATE} initState - Initial state of the visibility engine
     * @returns {Object} Object containing methods to interact with the visibility engine
     *
     * @example
     * ```tsx
     * const { disconnect, subscribe, getState, getPayload } = visibilityStore.startEngine("modal", "close");
     * ```
     */
    startEngine: (name: string, initState: VISIBILITY_STATE) => {
      let instance = store.get(name);

      // Create new instance only if it doesn't exist
      if (!instance) {
        instance = createVisibilityEngine(name, initState);
        store.set(name, instance);
        refCount.set(name, 0);
      }

      // Increment reference count for this visibility item
      refCount.set(name, (refCount.get(name) || 0) + 1);

      const { subscribe, getState, getPayload } = instance;
      return {
        /**
         * Returns a cleanup function that decrements reference count and removes the visibility item
         * from the store only when no more components are using it.
         * This prevents memory leaks and ensures proper cleanup.
         *
         * @returns {Function} Cleanup function that should be called on component unmount
         */
        disconnect: () => {
          return () => {
            const currentCount = refCount.get(name) || 0;
            if (currentCount <= 1) {
              // No more references, safe to delete
              store.delete(name);
              refCount.delete(name);
            } else {
              // Decrement reference count
              refCount.set(name, currentCount - 1);
            }
          };
        },
        /**
         * Subscribe to visibility state changes.
         * @param {Function} notify - Callback function to be called when state changes
         * @returns {Function} Unsubscribe function
         */
        subscribe,
        /**
         * Get the current visibility state.
         * @returns {VISIBILITY_STATE} Current state of the visibility item
         */
        getState,
        /**
         * Get the current payload data associated with the visibility item.
         * @returns {any} Current payload data
         */
        getPayload,
      };
    },
    /**
     * Opens a visibility item and optionally sets payload data.
     * Dispatches a visibility change event to all subscribers.
     *
     * @param {string} name - Name of the visibility item to open
     * @param {any} [payload] - Optional payload data to associate with the item
     * @throws {Error} Throws error if visibility item with given name doesn't exist
     *
     * @example
     * ```tsx
     * // Open without payload
     * visibilityStore.open("modal");
     *
     * // Open with payload
     * visibilityStore.open("modal", { title: "My Modal", content: "Hello World" });
     * ```
     */
    open(name: string, payload?: any) {
      const instance = store.get(name);
      if (!instance) {
        throw new Error(`Visibility item with name "${name}" not found`);
      }
      const { dispatch } = instance;
      dispatch({
        value: VISIBILITY_STATE.OPEN,
        data: payload,
      });
    },

    /**
     * Closes a visibility item and optionally sets payload data.
     * Dispatches a visibility change event to all subscribers.
     *
     * @param {string} name - Name of the visibility item to close
     * @param {any} [payload] - Optional payload data to associate with the item
     * @throws {Error} Throws error if visibility item with given name doesn't exist
     *
     * @example
     * ```tsx
     * // Close without payload
     * visibilityStore.close("modal");
     *
     * // Close with payload
     * visibilityStore.close("modal", { reason: "user_cancelled" });
     * ```
     */
    close: (name: string, payload?: any) => {
      const instance = store.get(name);
      if (!instance) {
        throw new Error(`Visibility item with name "${name}" not found`);
      }
      const { dispatch } = instance;
      dispatch({
        value: VISIBILITY_STATE.CLOSE,
        data: payload,
      });
    },

    /**
     * Gets the visibility entity by name.
     *
     * @param {string} name - Name of the visibility item
     * @returns {VisibilityEngine} The visibility engine (throws if not found)
     *
     * @example
     * ```tsx
     * const engine = visibilityStore.getEntity("modal");
     * console.log(engine.getState()); // "open" or "close"
     * ```
     */
    getEntity: (name: string) => {
      return store.get(name)!;
    },
  };
};

export { createBrowserVisibility };
