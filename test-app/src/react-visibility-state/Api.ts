import type { Handlers } from "./Handlers";
import type { IVisibilityInstance } from "./types";

/**
 * API class containing methods to control visibility state.
 * All methods use silent fail behavior - invalid operations do nothing.
 */
export class Api {
  private instance: IVisibilityInstance;
  handlers: Handlers;
  open: (payload?: any) => void;
  close: () => void;
  reset: () => void;

  constructor(instance: IVisibilityInstance, handlers: Handlers) {
    this.instance = instance;
    this.handlers = handlers;
    this.open = this.handlers.open.bind(this.instance);
    this.close = this.handlers.close.bind(this.instance);
    this.reset = this.handlers.reset.bind(this.instance);
  }
}
