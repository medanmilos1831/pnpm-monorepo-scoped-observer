import { SCROLLIUM_STORE_SCOPE } from "../types";
import { createStoreInstance } from "../core/createStoreInstance";

/**
 * Creates a registry store for managing multiple scrollium entity instances.
 *
 * Uses a Map-based storage for O(1) lookup performance and supports multiple
 * scroll containers with independent state management.
 *
 * @template T - The entity type (typically IEntity)
 *
 * @returns Store instance with mutations and getters for entity management
 *
 * @example
 * ```ts
 * const store = createStore<IEntity>();
 *
 * // Create entity
 * store.mutations.createEntity(props, entity);
 *
 * // Access entity
 * const entity = store.getters.getEntityById("scroll-one");
 *
 * // Check existence
 * if (store.getters.hasEntity("scroll-one")) { ... }
 * ```
 */
function createStore<T>() {
  return createStoreInstance({
    id: SCROLLIUM_STORE_SCOPE,
    state: new Map<string, T>(),
    mutations(state) {
      return {
        /**
         * Creates and registers a new entity in the store.
         * If entity with the same ID already exists, it won't be overwritten.
         *
         * @param props - Entity props with required id field
         * @param entity - The entity instance to register
         */
        createEntity<P extends { id: string }>(props: P, entity: T) {
          if (!state.has(props.id)) {
            state.set(props.id, entity);
          }
        },
        /**
         * Removes an entity from the store by its ID.
         *
         * @param id - The entity ID to remove
         */
        removeEntity: (id: string) => {
          state.delete(id);
        },
      };
    },
    getters(state) {
      return {
        /**
         * Gets entity by ID. Throws if entity doesn't exist.
         *
         * @param id - The entity ID
         * @returns The entity instance
         */
        getEntityById: (id: string) => state.get(id)!,
        /**
         * Gets entity by ID. Returns undefined if not found.
         *
         * @param id - The entity ID
         * @returns The entity instance or undefined
         */
        getEntity: (id: string) => state.get(id),
        /**
         * Checks if entity exists in the store.
         *
         * @param id - The entity ID to check
         * @returns True if entity exists
         */
        hasEntity: (id: string) => state.has(id),
        /**
         * Gets an iterator of all entities in the store.
         *
         * @returns Iterator of all entity values
         */
        getAllEntities: () => state.values(),
        /**
         * Gets the total count of entities in the store.
         *
         * @returns Number of entities
         */
        getEntityCount: () => state.size,
      };
    },
  });
}

export { createStore };
