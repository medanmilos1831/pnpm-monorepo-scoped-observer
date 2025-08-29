import { useEffect, useState } from "react";
import { VisibilityInstance } from "./VisibilityInstance";
import { Api } from "./Api";
import { Handlers } from "./Handlers";
import { useInitialRender } from "./hooks";
import { createVisibilityData } from "./utils";
import type {
  VisibilityConfig,
  VisibilityHandlerProps,
  VisibilityData,
} from "./types";

/**
 * Factory function for creating visibility state managers.
 * Returns an object with useVisibility, VisibilityHandler, and useWatch.
 *
 * @param config - Configuration object with keys array
 * @returns Object containing visibility management functions
 */
const createVisibility = <T extends readonly string[]>(config: { keys: T }) => {
  const items: Map<
    T[number],
    { instance: VisibilityInstance; api: Api; handlers: Handlers }
  > = new Map();

  return {
    /**
     * Hook for managing visibility state.
     * @param name - The visibility name
     * @param visibilityConfig - Configuration object
     * @returns API object for controlling visibility
     */
    useVisibility: (
      name: T[number],
      visibilityConfig: VisibilityConfig = { initState: "close" }
    ) => {
      const isInitialRender = useInitialRender();
      const [state] = useState(() => {
        const instance = new VisibilityInstance(name, visibilityConfig);
        const api = new Api(instance);
        const handlers = new Handlers();

        items.set(name, { instance, api, handlers });
        return { instance, api, handlers };
      });

      if (!isInitialRender) {
        state.handlers.update.call(state.instance, name, visibilityConfig);
      }

      useEffect(() => {
        return () => {
          items.delete(name);
        };
      }, []);

      return state.api;
    },

    /**
     * Component for handling visibility state changes.
     * @param props - Component props
     * @returns JSX element or null
     */
    VisibilityHandler: ({ children, name }: VisibilityHandlerProps<T>) => {
      const item = items.get(name);

      useEffect(() => {
        return () => {
          const instance = items.get(name);
          instance?.api.reset();
          items.delete(name);
        };
      }, []);

      if (!item) {
        return null;
      }

      const { state, payload } = item.instance.machine.useMachine();

      return children({
        name: item.instance.name,
        currentState: item.instance.currentState,
        currentPayload: item.instance.currentPayload,
        initState: item.instance.initState,
        state,
        payload,
        open: item.api.open,
        close: item.api.close,
        reset: item.api.reset,
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

      item.instance.machine.useMachine();

      // Create the same data object as onChange using utility function
      const visibilityData = createVisibilityData(item.instance);

      // Return only what callback returns
      return callback(visibilityData);
    },

    /**
     * Gets a visibility item by name for direct access.
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
      return item.api;
    },
  };
};

export { createVisibility };
