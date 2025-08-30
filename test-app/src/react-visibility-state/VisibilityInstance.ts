import type { IVisibilityInstance, VisibilityConfig } from "./types";
import { createVisibilityMachine, validateVisibilityConfig } from "./utils";

/**
 * Visibility instance class that manages the state and behavior.
 * Implements the IVisibilityInstance interface.
 */
class VisibilityInstance implements IVisibilityInstance {
  name: string;
  machine: any;
  currentState: "open" | "close";
  currentPayload: any;
  initState: "open" | "close";
  onChange?: (data: any) => void;

  /**
   * Creates a new visibility instance with the specified configuration.
   * @param name - Unique identifier for this visibility instance
   * @param config - Configuration object containing initial state
   * @throws Error if configuration is invalid
   */
  constructor(name: string, config: VisibilityConfig) {
    // Use utility function for validation
    validateVisibilityConfig(name, config);

    // Initialize basic properties
    this.name = name;
    this.initState = config.initState;
    this.currentState = config.initState;
    this.currentPayload = null;
    this.onChange = config.onChange;

    // Create and initialize state machine using utility function
    this.machine = createVisibilityMachine(config.initState);
  }
}

export { VisibilityInstance };
