import { createMachine } from "@scoped-observer/react-state-machine";
import { VisibilityInstance } from "./VisibilityInstance";
import { Api } from "./Api";
import { Handlers } from "./Handlers";
import type {
  IVisibilityInstance,
  VisibilityData,
  VisibilityConfig,
} from "./types";

/**
 * Utility functions for react-visibility-state package.
 * Contains reusable methods for common operations.
 */

/**
 * Creates the onChange object by extracting relevant properties from a visibility instance.
 * This is used consistently across VisibilityHandler, useWatch, and other components.
 *
 * @param instance - The visibility instance to extract properties from
 * @returns Object containing visibility data for onChange callbacks
 */
export function createVisibilityData(
  instance: IVisibilityInstance
): VisibilityData {
  const { machine, onChange, ...rest } = instance;
  return rest;
}

/**
 * Validates visibility configuration to ensure it's valid.
 * Throws descriptive errors for invalid configurations.
 *
 * @param name - The visibility name
 * @param config - The configuration object
 * @throws Error if configuration is invalid
 */
export function validateVisibilityConfig(
  name: string,
  config: VisibilityConfig
): void {
  if (!name || typeof name !== "string") {
    throw new Error("[Visibility] Name must be a valid string");
  }

  if (!config || typeof config !== "object") {
    throw new Error("[Visibility] Configuration must be a valid object");
  }

  if (!config.initState || !["open", "close"].includes(config.initState)) {
    throw new Error(
      `[Visibility] initState must be either "open" or "close", got: ${config.initState}`
    );
  }
}

/**
 * Creates state machine transitions for visibility states.
 * Handles open, close, and reset transitions.
 *
 * @param initState - Initial state ("open" or "close")
 * @returns State machine configuration
 */
export function createVisibilityMachine(initState: "open" | "close") {
  const transitions = {
    close: {
      on: {
        ON_OPEN: "open",
        RESET: "close",
      },
    },
    open: {
      on: {
        ON_CLOSE: "close",
        RESET: "close",
      },
    },
  };

  return createMachine({
    init: initState,
    transition: transitions,
  });
}

/**
 * Updates visibility properties based on new state.
 * This ensures consistency across the instance.
 *
 * @param instance - The visibility instance to update
 * @param newState - The new state to set
 * @param payload - Optional payload data
 */
export function updateVisibilityProperties(
  instance: IVisibilityInstance,
  newState: "open" | "close",
  payload?: unknown
): void {
  instance.state = newState;
  instance.payload = payload;
}
