import { createMachine } from "../react-state-machine";

import type { Handlers } from "./Handlers";
import type { VisibilityInstance } from "./VisibilityInstance";

import { VISIBILITY_STATE, type VisibilityConfig } from "./types";

/**
 * Validates visibility configuration parameters
 * Ensures all required fields are present and valid
 * @param name - Visibility instance name to validate
 * @param config - Configuration object to validate
 * @throws Error if validation fails
 */
export function validateVisibilityConfig(
  name: string,
  config: VisibilityConfig
): void {
  // Validate name parameter
  if (!name || typeof name !== "string") {
    throw new Error("[Visibility] Name must be a valid string");
  }

  // Validate config object
  if (!config || typeof config !== "object") {
    throw new Error("[Visibility] Configuration must be a valid object");
  }

  // Validate initial state
  if (
    !config.initState ||
    ![VISIBILITY_STATE.OPEN, VISIBILITY_STATE.CLOSE].includes(
      config.initState as VISIBILITY_STATE
    )
  ) {
    throw new Error(
      `[Visibility] initState must be either "${VISIBILITY_STATE.OPEN}" or "${VISIBILITY_STATE.CLOSE}", got: ${config.initState}`
    );
  }
}

/**
 * Creates a state machine for visibility management
 * Defines transitions between open and close states
 * @param initState - Initial state for the machine
 * @returns Configured state machine instance
 */
export function createVisibilityMachine(initState: `${VISIBILITY_STATE}`) {
  return createMachine({
    init: initState,
    transition: {
      // Transition from close to open
      [VISIBILITY_STATE.CLOSE]: {
        on: {
          ON_OPEN: VISIBILITY_STATE.OPEN,
        },
      },
      // Transition from open to close
      [VISIBILITY_STATE.OPEN]: {
        on: {
          ON_CLOSE: VISIBILITY_STATE.CLOSE,
        },
      },
    },
  });
}

/**
 * Creates API object for visibility instance
 * Binds handler methods to instance and provides current state
 * @param instance - Visibility instance to create API for
 * @param handlers - Handler methods for open/close operations
 * @returns API object with bound methods and current state
 */
export function api(instance: VisibilityInstance, handlers: Handlers) {
  return {
    // Bind open handler to instance
    open: handlers.open.bind(instance),
    // Bind close handler to instance
    close: handlers.close.bind(instance),
    // Get current state from machine
    state: instance.machine.getState(),
    // Get current payload from instance
    payload: instance.payload,
  };
}
