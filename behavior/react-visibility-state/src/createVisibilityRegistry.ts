import { createVisibilityMachine } from './createVisibilityMachine';

export type VisibilityMachine = ReturnType<typeof createVisibilityMachine>;

type VisibilityMap = Map<string, VisibilityMachine>;

type VisibilityPayload = any;

export type FallbackHandler = {
  handler: (payload?: VisibilityPayload) => void;
};

export type VisibilityHandler = VisibilityMachine | FallbackHandler;

export type VisibilityRegistry = {
  /**
   * Registers and returns a VisibilityMachine under the given name.
   * If it already exists, returns the existing one.
   */
  subscribe: (name: string) => VisibilityMachine;

  /**
   * Handles visibility logic.
   * If not registered, logs a warning via fallback handler.
   */
  handleVisibility: (name: string, payload?: VisibilityPayload) => void;

  /**
   * Removes the registered by name.
   */
  removeItem: (name: string) => void;
};

export const createVisibilityRegistry = (): VisibilityRegistry => {
  const registry: VisibilityMap = new Map();

  const fallbackHandler: FallbackHandler = {
    handler: (name: string) => {
      console.warn(`${name} not found in registry`);
    },
  };

  return {
    subscribe(name: string): VisibilityMachine {
      if (!registry.has(name)) {
        registry.set(name, createVisibilityMachine());
      }
      return registry.get(name)!;
    },

    handleVisibility(name: string, payload?: VisibilityPayload): void {
      const machine = registry.get(name);
      if (machine) {
        machine.send({ type: 'TOGGLE', payload });
      } else {
        fallbackHandler.handler(name);
      }
    },

    removeItem(name: string): void {
      registry.delete(name);
    },
  };
};
