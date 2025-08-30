import { useEffect, useState } from "react";

import { Api } from "./Api";
import { createVisibilityData } from "./utils";
import { VisibilityInstance } from "./VisibilityInstance";

import type {
  VisibilityHandlerProps,
  VisibilityConfig,
  VisibilityData,
  IVisibilityInstance,
} from "./types";
import { Handlers } from "./Handlers";
import { useInitialRender } from "./hooks";

/**
 * Creates a visibility manager with predefined keys for type-safe visibility instances.
 * Each visibility instance manages its own state and payload.
 *
 * @template T - A readonly array of string keys that define valid visibility names
 * @param config - Configuration object containing the valid visibility keys
 * @returns An object with methods to create and manage visibility instances
 *
 * @example
 * ```typescript
 * const visibility = createVisibility({
 *   keys: ["modal", "tooltip"] as const
 * });
 *
 * // TypeScript will only allow these names
 * const instance = visibility.useVisibility("modal", config);
 * ```
 */
const createVisibility = <T extends readonly string[]>(config: { keys: T }) => {
  const items: Map<T[number], { visibility: IVisibilityInstance; api: Api }> =
    new Map();
  const handlers = new Handlers();
  return {
    /**
     * Creates a visibility instance for the specified name.
     * Each call to this hook creates a new visibility instance if it doesn't exist.
     *
     * @param name - The visibility name (must be one of the defined keys)
     * @param config - Configuration object with initial state
     * @returns API object with visibility methods (open, close, reset)
     *
     * @example
     * ```typescript
     * const modal = visibility.useVisibility("modal", {
     *   initState: "close"
     * });
     * ```
     */
    useVisibility: (
      name: T[number],
      config: VisibilityConfig = { initState: "close" }
    ) => {
      const init = useInitialRender();
      const [state] = useState(() => {
        const instance = new VisibilityInstance(name, config);
        const api = new Api(instance, handlers);
        items.set(name, { visibility: instance, api });
        return { visibility: instance, api };
      });

      if (!init) {
        handlers.update.call(state.visibility, name, config);
      }

      useEffect(() => {
        return () => {
          items.delete(state.visibility.name);
        };
      }, []);

      return state.api;
    },

    /**
     * Render prop component that provides visibility state and control functions.
     * Use this to render UI components that need access to visibility state.
     *
     * @param props - Component props including name and children render function
     * @returns The rendered children with visibility state and functions
     *
     * @example
     * ```typescript
     * <visibility.VisibilityHandler name="modal">
     *   {({ currentState, currentPayload, open, close }) => (
     *     <div>
     *       <span>State: {currentState}</span>
     *       <button onClick={open}>Open</button>
     *       <button onClick={close}>Close</button>
     *     </div>
     *   )}
     * </visibility.VisibilityHandler>
     * ```
     */
    VisibilityHandler: ({ children, name }: VisibilityHandlerProps<T>) => {
      const item = items.get(name);
      if (!item) {
        return null;
      }

      // Use machine hook to trigger re-renders when state changes
      const { state, payload } = item.visibility.machine.useMachine();

      return children({
        name: item.visibility.name,
        state,
        payload,
        close: item.api.close,
      });
    },

    /**
     * Hook that watches visibility state and returns computed values.
     * Returns only what the callback function returns.
     *
     * @template C - The type of computed values returned by the callback
     * @param name - The visibility name to watch
     * @param callback - Function to compute derived values from visibility state
     * @returns Only the result of the callback function
     * @throws Error if name is invalid
     *
     * @example
     * ```typescript
     * // Returns only what callback returns
     * const { isOpen, hasPayload } = visibility.useWatch("modal",
     *   (visibilityData) => ({
     *     isOpen: visibilityData.currentState === "open",
     *     hasPayload: !!visibilityData.currentPayload
     *   })
     * );
     * ```
     */
    useWatch: <C>(
      name: T[number],
      callback: (visibilityData: VisibilityData) => C
    ): C => {
      const item = items.get(name);
      if (!item) {
        return null as C; // Silent fail - returns null instead of an error
      }

      item.visibility.machine.useMachine();

      // Create the same data object as onChange using utility function
      const visibilityData = createVisibilityData(item.visibility);

      // Return only what callback returns
      return callback(visibilityData);
    },

    /**
     * Gets a visibility instance by name for direct access.
     * Useful when you need to access visibility methods outside of React components.
     *
     * @param name - The visibility name to retrieve
     * @returns The visibility instance or throws error if not found
     *
     * @example
     * ```typescript
     * const instance = visibility.getItem("modal");
     * instance.open();
     * ```
     */
    getItem: (name: T[number]) => {
      const item = items.get(name);
      if (!item) {
        throw new Error(
          `[Visibility] Visibility with name "${name}" not found. Available keys: [${Array.from(
            config.keys
          ).join(", ")}]`
        );
      }
      return item;
    },
  };
};

export { createVisibility };
