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

    // Create and initialize state machine using utility function
    this.machine = createVisibilityMachine(config.initState);
  }

  /**
   * Gets the API object for this instance.
   */
  get api() {
    return {
      open: (payload?: any) => {
        this.currentState = "open";
        this.currentPayload = payload;
        this.machine.send({ type: "ON_OPEN", payload });
      },
      close: () => {
        this.currentState = "close";
        this.currentPayload = null;
        this.machine.send({ type: "ON_CLOSE" });
      },
      reset: () => {
        this.currentState = this.initState;
        this.currentPayload = null;
        this.machine.send({ type: "RESET" });
      },
    };
  }
}

export { VisibilityInstance };
