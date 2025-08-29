import type { IVisibilityInstance } from "./types";

/**
 * Base class containing handler methods for visibility state management.
 * This class handles all the action logic while keeping state management separate.
 */
export class Handlers {
  /**
   * Opens the visibility state.
   * @param payload - Optional payload data
   */
  open(this: IVisibilityInstance, payload?: any): void {
    this.machine.send({
      type: "ON_OPEN",
      payload,
    });
  }

  /**
   * Closes the visibility state.
   */
  close(this: IVisibilityInstance): void {
    this.machine.send({
      type: "ON_CLOSE",
    });
  }

  /**
   * Resets the visibility state to initial state.
   */
  reset(this: IVisibilityInstance): void {
    this.machine.send({
      type: "RESET",
    });
  }

  /**
   * Updates the visibility configuration.
   * @param name - The visibility name
   * @param config - The configuration object
   */
  update(this: IVisibilityInstance, name: string, config: { initState: "open" | "close" }): void {
    this.name = name;
    this.initState = config.initState;
    
    // Reinitialize the state machine
    this.machine = this.createMachine();
  }

  /**
   * Creates a new state machine instance.
   * @returns State machine instance
   */
  private createMachine(): any {
    // This would typically import from @scoped-observer/react-state-machine
    // For now, we'll use a placeholder
    return {
      useMachine: () => ({ state: this.initState, payload: null }),
      send: (event: any) => {
        // Handle state transitions
        if (event.type === "ON_OPEN") {
          this.currentState = "open";
          this.currentPayload = event.payload;
        } else if (event.type === "ON_CLOSE") {
          this.currentState = "close";
          this.currentPayload = null;
        } else if (event.type === "RESET") {
          this.currentState = this.initState;
          this.currentPayload = null;
        }
      }
    };
  }
}
