import { createApp } from "./createApp";
import { createModuleInstance } from "./createModuleInstance";
import type { CreateModuleConfigType, IModuleClientAPI } from "./types";

const framework = (function () {
  const { getters, mutations } = createApp();
  const { hasModule, getModuleByName } = getters;
  const { createModule } = mutations;

  return {
    /**
     * Creates a module in the app.
     *
     * A module is a wrapper/container for entities that will form the UI.
     * It provides entity management capabilities (create, remove, get) and
     * acts as a factory for creating entity instances with their state managers,
     * actions, and event subscriptions.
     */
    createModule<S = any, M = any, G = any, A = any, L = any>(
      moduleConfig: CreateModuleConfigType<S, M, G, A, L>
    ) {
      if (!hasModule(moduleConfig.name)) {
        const moduleInstance = createModuleInstance(moduleConfig);
        createModule(moduleConfig.name, moduleInstance);
      }

      /**
       * Returns the module client API for managing entities within this module.
       *
       * This API provides three core methods for entity lifecycle management:
       *
       * @property {Function} createContext - Creates a new entity instance within the module.
       *   Takes entity props (must include 'id') and creates a new entity with:
       *   - stateManager: Entity's state manager containing state, mutations, and getters
       *   - actions: Entity's action functions for business logic operations
       *   - subscribe: Function to subscribe to entity-specific events
       *   If an entity with the same id already exists, this is a no-op.
       *
       * @property {Function} getContextById - Retrieves an entity by its unique identifier.
       *   Returns an entity object containing:
       *   - stateManager: Access to entity's state, mutations, and getters
       *   - actions: Entity's action functions
       *   - subscribe: Function to subscribe to entity events (eventName, callback)
       *   Throws if entity with given id doesn't exist.
       *
       * @property {Function} removeContext - Removes an entity from the module by its id.
       *   This permanently removes the entity and all its associated state, actions, and subscriptions.
       *   Safe to call even if entity doesn't exist (no-op).
       * @property {Function} onContextLoad - Called when a context is loaded.
       *   This is useful for initializing the context.
       */

      return getModuleByName(moduleConfig.name) as IModuleClientAPI<S, M, G, A>;
    },
  };
})();

export { framework };
