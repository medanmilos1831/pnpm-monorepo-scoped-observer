/**
 * Public API for visibility state management.
 * Provides methods for controlling visibility state.
 */
export class Api {
  constructor(private instance: any) {}

  /**
   * Opens the visibility state.
   * @param payload - Optional payload data
   */
  open(payload?: any): void {
    this.instance.api.open(payload);
  }

  /**
   * Closes the visibility state.
   */
  close(): void {
    this.instance.api.close();
  }

  /**
   * Resets the visibility state to initial state.
   */
  reset(): void {
    this.instance.api.reset();
  }

  /**
   * Gets the current state.
   */
  get state(): "open" | "close" {
    return this.instance.machine.useMachine().state;
  }

  /**
   * Gets the current payload.
   */
  get payload(): any {
    return this.instance.machine.useMachine().payload;
  }
}
