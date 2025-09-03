import type { IVisibilityInstance, VisibilityConfig } from "./types";
import { createVisibilityMachine, validateVisibilityConfig } from "./utils";

/**
 * Represents a single visibility instance with state machine and configuration
 * Implements IVisibilityInstance interface for consistent behavior
 */
class VisibilityInstance implements IVisibilityInstance {
  /** Unique identifier for this visibility instance */
  name: string;
  /** State machine managing visibility transitions */
  machine: any;
  /** Optional data associated with visibility state */
  payload: any;
  /** Callback function triggered on state changes */
  onChange?: (data: any) => void;

  /**
   * Creates a new visibility instance
   * @param name - Unique identifier for the instance
   * @param config - Configuration object with initial state and callbacks
   */
  constructor(name: string, config: VisibilityConfig) {
    // Validate configuration parameters
    validateVisibilityConfig(name, config);

    // Initialize instance properties
    this.name = name;
    this.payload = null;
    this.onChange = config.onChange;

    // Create state machine with initial state
    this.machine = createVisibilityMachine(config.initState);
  }
}

export { VisibilityInstance };
