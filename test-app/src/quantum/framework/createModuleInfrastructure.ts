import { core } from "../core/core";
import { ENTITY_EVENTS, type IModuleConfig } from "./types";

/**
 * Creates the high-level module infrastructure responsible for managing entity stores.
 * Internally it keeps a registry of entities (via a store) and exposes helpers for
 * creating entities, retrieving them, and subscribing to lifecycle events.
 *
 * @param moduleConfig Declarative description of how to construct each entity store.
 */
const createModuleInfrastructure = <S, A>(
  moduleConfig: IModuleConfig<S, A>
) => {
  const modules = core.createStore(new Map<string, A>());

  return {
    /**
     * Public helper for creating entities through the internal infra.
     */
    createEntity: (entityConfig: { id: string; state: S }) => {
      const { id, state } = moduleConfig.onCreateEntity({
        id: entityConfig.id,
        state: entityConfig.state,
      });
      if (modules.getState().has(id)) {
        return;
      }
      const store = core.createStore(state);
      const client = moduleConfig.clientSchema(store);

      modules.setState((prevState) => prevState.set(id, client), {
        customEvents: [`${ENTITY_EVENTS.ON_ENTITY_LOAD}-${id}`],
      });
    },
    destroyEntity: (id: string) => {
      modules.setState(
        (prevState) => {
          prevState.delete(id);
          return prevState;
        },
        {
          customEvents: [`${ENTITY_EVENTS.ON_ENTITY_DESTROY}-${id}`],
        }
      );
    },
    /**
     * Retrieves entity metadata (store + destroy handler) by id.
     */
    getEntityById: (id: string) => {
      return modules.getState().get(id);
    },
    /**
     * Subscribes to entity load events for a specific id.
     */
    onEntityLoad: (id: string, callback: (payload?: any) => void) => {
      return modules.subscribe(
        callback,
        `${ENTITY_EVENTS.ON_ENTITY_LOAD}-${id}`
      );
    },
    /**
     * Subscribes to entity destroy events for a specific id.
     */
    onEntityDestroy: (id: string, callback: (payload?: any) => void) => {
      return modules.subscribe(
        callback,
        `${ENTITY_EVENTS.ON_ENTITY_DESTROY}-${id}`
      );
    },
  };
};

export { createModuleInfrastructure };
