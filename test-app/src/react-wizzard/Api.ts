import type { Handlers } from "./Handlers";
import type { WizzardInstanceInterface } from "./types";

/**
 * API class containing methods to control wizzard navigation.
 * All methods use silent fail behavior - invalid operations do nothing.
 */
export class Api {
  private instance: WizzardInstanceInterface;
  handlers: Handlers;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: string) => void;
  reset: () => void;

  constructor(instance: WizzardInstanceInterface, handlers: Handlers) {
    this.instance = instance;
    this.handlers = handlers;
    this.nextStep = this.handlers.nextStep.bind(this.instance);
    this.prevStep = this.handlers.prevStep.bind(this.instance);
    this.goToStep = this.handlers.goToStep.bind(this.instance);
    this.reset = this.handlers.reset.bind(this.instance);
  }
}
