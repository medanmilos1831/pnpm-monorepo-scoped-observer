import { core } from "../core/core";
import { createEntityInfrastructure } from "./createEntityInfrastructure";
import { ENTITY_EVENTS, type IModuleConfig } from "./types";

/**
 * Creates the high-level module infrastructure responsible for managing entity stores.
 * Internally it keeps a registry of entities (via a store) and exposes helpers for
 * creating entities, retrieving them, and subscribing to lifecycle events.
 *
 * @param moduleConfig Declarative description of how to construct each entity store.
 */
const createModuleInfrastructure = <S>(moduleConfig: IModuleConfig<S>) => {
  const modules = core.createStore(
    new Map<
      string,
      {
        store: ReturnType<typeof core.createStore<S>>;
        destroy: () => void;
      }
    >()
  );

  const entityInfrastructure = createEntityInfrastructure(
    modules,
    moduleConfig
  );

  return {
    /**
     * Public helper for creating entities through the internal infra.
     */
    createEntity: entityInfrastructure.createEntity,
    /**
     * Retrieves entity metadata (store + destroy handler) by id.
     */
    getEntityById: entityInfrastructure.getEntityById,
    /**
     * Subscribes to entity load events for a specific id.
     */
    onEntityLoad: (id: string, callback: (payload?: any) => void) => {
      return modules.subscribe((payload) => {
        callback({
          newState: Array.from(payload.newState.values()),
          prevState: Array.from(payload.prevState.values()),
        });
      }, `${ENTITY_EVENTS.ON_ENTITY_LOAD}-${id}`);
    },
    /**
     * Subscribes to entity destroy events for a specific id.
     */
    onEntityDestroy: (id: string, callback: (payload?: any) => void) => {
      return modules.subscribe((payload) => {
        callback({
          newState: Array.from(payload.newState.values()),
          prevState: Array.from(payload.prevState.values()),
        });
      }, `${ENTITY_EVENTS.ON_ENTITY_DESTROY}-${id}`);
    },
  };
};

export { createModuleInfrastructure };
