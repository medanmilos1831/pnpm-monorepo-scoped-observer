import type { IVisibilityInstance } from "./types";
import { api } from "./utils";

/**
 * Handlers for visibility state transitions
 * Provides open/close methods that can be bound to visibility instances
 */
export class Handlers {
  /**
   * Opens visibility and sets payload
   * @param payload - Optional data to store with the visibility state
   */
  open(this: IVisibilityInstance, payload?: any): void {
    this.payload = payload;
    this.machine.send({
      type: "ON_OPEN",
    });
    this.onChange?.({
      payload: this.payload,
      state: this.machine.getState(),
    });
  }

  /**
   * Closes visibility and clears payload
   */
  close(this: IVisibilityInstance): void {
    this.payload = null;
    this.machine.send({
      type: "ON_CLOSE",
    });
    this.onChange?.({
      payload: this.payload,
      state: this.machine.getState(),
    });
  }
}
