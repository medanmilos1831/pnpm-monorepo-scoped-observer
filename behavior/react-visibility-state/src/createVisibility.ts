import { useEffect, useState } from "react";

import { Handlers } from "./Handlers";
import { useInitialRender } from "./hooks";
import { VisibilityInstance } from "./VisibilityInstance";

import type { VisibilityConfig } from "./types";
import { VISIBILITY_STATE } from "./types";

import { api } from "./utils";

/**
 * Creates a visibility management system with configurable keys
 * @template T - Tuple type for visibility keys
 * @param config - Configuration object containing visibility keys
 * @returns Object with visibility management methods
 */
const createVisibility = <T extends readonly string[]>(config: { keys: T }) => {
  // Store for visibility instances mapped by name
  const store = new Map<T[number], VisibilityInstance>();
  // Handlers for open/close operations
  const handlers = new Handlers();

  return {
    /**
     * Hook for managing visibility state
     * @param name - Unique identifier for visibility instance
     * @param config - Configuration for visibility behavior
     * @returns API object with open/close methods and current state
     */
    useVisibility: (
      name: T[number],
      config: VisibilityConfig = { initState: VISIBILITY_STATE.CLOSE }
    ) => {
      // Check if this is the initial render
      const isInitialRender = useInitialRender();
      // Create and store visibility instance
      const [instance] = useState(() => {
        const instance = new VisibilityInstance(name, config);
        store.set(name, instance);
        return store.get(name)!;
      });
      // Set onChange callback only on initial render to avoid stale closures
      if (isInitialRender) {
        instance.onChange = config.onChange;
      }
      // Cleanup on unmount
      useEffect(() => {
        return () => {
          store.delete(name);
        };
      }, []);

      return api(instance, handlers);
    },

    /**
     * Component wrapper for visibility state
     * @param name - Unique identifier for visibility instance
     * @param children - Render function receiving visibility API
     * @returns Rendered children with visibility context
     */
    VisibilityHandler({
      name,
      children,
    }: {
      name: T[number];
      children: (props: any) => React.ReactNode;
    }) {
      // Get visibility instance from store
      const instance = store.get(name);
      if (!instance) {
        return null;
      }
      instance.machine.useMachine();
      // Pass visibility API to children render function
      return children(api(instance, handlers));
    },

    /**
     * Hook for watching visibility state changes
     * @template C - Return type of the callback function
     * @param name - Unique identifier for visibility instance
     * @param callback - Function called with current visibility state
     * @returns Result of the callback function
     */
    useWatch: <C>(
      name: T[number],
      callback: (state: VISIBILITY_STATE) => C
    ): C => {
      // Get visibility instance from store
      const instance = store.get(name);
      if (!instance) {
        return null as C;
      }

      // Get current state from machine
      const { state } = instance.machine.useMachine();

      // Call callback with current state
      return callback(state);
    },

    /**
     * Retrieves visibility instance and API by name
     * @param name - Unique identifier for visibility instance
     * @returns Visibility API object with open/close methods and state
     * @throws Error if visibility instance not found
     */
    getItem: (name: T[number]) => {
      // Get visibility instance from store
      const instance = store.get(name);
      if (!instance) {
        throw new Error(
          `[Visibility] Visibility with name "${name}" not found. Available keys: [${Array.from(
            config.keys
          ).join(", ")}]`
        );
      }
      // Return visibility API for the instance
      return api(instance, handlers);
    },
  };
};

export { createVisibility };
