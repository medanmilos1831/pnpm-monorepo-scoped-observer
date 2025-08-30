import {
  createVisibilityData,
  updateVisibilityProperties,
  createVisibilityMachine,
} from "./utils";
import type { IVisibilityInstance, VisibilityConfig } from "./types";

/**
 * Base class containing handler methods for visibility state management.
 * This class handles all the action logic while keeping state management separate.
 */
export class Handlers {
  /**
   * Opens the visibility state.
   * Does nothing if already open.
   */
  open(this: IVisibilityInstance, payload?: any): void {
    if (this.currentState === "open") {
      return; // Silent fail - already open
    }

    // Use utility function to update visibility properties
    updateVisibilityProperties(this, "open", payload);

    this.machine.send({ type: "ON_OPEN", payload });
    this.onChange?.(createVisibilityData(this));
  }

  /**
   * Closes the visibility state.
   * Does nothing if already closed.
   */
  close(this: IVisibilityInstance): void {
    if (this.currentState === "close") {
      return; // Silent fail - already closed
    }

    // Use utility function to update visibility properties
    updateVisibilityProperties(this, "close");

    this.machine.send({ type: "ON_CLOSE" });
    this.onChange?.(createVisibilityData(this));
  }

  /**
   * Resets the visibility state to its initial state.
   */
  reset(this: IVisibilityInstance): void {
    // Use utility function to update visibility properties
    updateVisibilityProperties(this, this.initState);

    this.machine.send({ type: "RESET" });
    this.onChange?.(createVisibilityData(this));
  }

  /**
   * Updates the visibility configuration and reinitializes the state machine.
   * This method allows dynamic updates to visibility configuration.
   */
  update(
    this: IVisibilityInstance,
    name: string,
    config: VisibilityConfig
  ): void {
    this.name = name;
    this.initState = config.initState;
    this.onChange = config.onChange;

    // Create and initialize state machine using utility function
    this.machine = createVisibilityMachine(this.initState);
  }
}
