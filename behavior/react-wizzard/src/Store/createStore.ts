import { createStateManager } from "../core/createStateManager";
import { WIZARD_STORE_SCOPE } from "../types";

/**
 * Creates a wizard store instance for managing multiple wizard entities.
 *
 * The store acts as a registry that maintains a Map of wizard entities
 * keyed by their unique identifiers. Provides mutations and getters for
 * entity lifecycle management.
 *
 * @template T - Type of entity stored in the registry
 *
 * @returns Store instance with state (Map), mutations, getters, and observer
 *
 * @example
 * ```ts
 * type WizardEntity = ReturnType<typeof createEntityApiClient>;
 * const store = createStore<WizardEntity>();
 *
 * // Create an entity
 * store.mutations.createEntity(
 *   { id: "wizard-1" },
 *   () => createEntityApiClient({ id: "wizard-1", steps: [...], activeStep: "step1" })
 * );
 *
 * // Get entity
 * const entity = store.getters.getEntityById("wizard-1");
 * ```
 */
function createStore<T>() {
  return createStateManager({
    id: WIZARD_STORE_SCOPE,
    state: new Map<string, T>(),
    mutations(state) {
      return {
        /**
         * Creates and registers a new entity in the store.
         *
         * Only creates the entity if it doesn't already exist (idempotent).
         *
         * @template P - Type extending { id: string }
         * @param props - Entity configuration with id property
         * @param props.id - Unique identifier for the entity
         * @param entity - Factory function that returns the entity instance
         */
        createEntity<P extends { id: string }>(props: P, entity: () => T) {
          if (!state.has(props.id)) {
            state.set(props.id, entity());
          }
        },

        /**
         * Removes an entity from the store by ID.
         *
         * @param id - Entity identifier to remove
         */
        removeEntity: (id: string) => {
          state.delete(id);
        },
      };
    },
    getters(state) {
      return {
        /**
         * Gets an entity by ID, throwing if not found.
         *
         * @param id - Entity identifier
         * @returns Entity instance
         * @throws Error if entity does not exist
         */
        getEntityById: (id: string) => state.get(id)!,

        /**
         * Gets an entity by ID, returning undefined if not found.
         *
         * @param id - Entity identifier
         * @returns Entity instance or undefined
         */
        getEntity: (id: string) => state.get(id),

        /**
         * Checks if an entity exists in the store.
         *
         * @param id - Entity identifier
         * @returns True if entity exists, false otherwise
         */
        hasEntity: (id: string) => state.has(id),

        /**
         * Gets an iterator over all entity values in the store.
         *
         * @returns Iterator of all entities
         */
        getAllEntities: () => state.values(),

        /**
         * Gets the total number of entities in the store.
         *
         * @returns Number of registered entities
         */
        getEntityCount: () => state.size,
      };
    },
  });
}

export { createStore };
