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
  const modules = core.createStore(
    new Map<string, A & { destroy: () => void }>()
  );

  return {
    /**
     * Public helper for creating entities through the internal infra.
     */
    createEntity: (entityConfig: { id: string; state: S }) => {
      const value = moduleConfig.store({
        id: entityConfig.id,
        state: entityConfig.state,
      });
      if (modules.getState().has(value.id)) {
        return;
      }
      const store = core.createStore(value.state);
      const client = moduleConfig.apiClient(store);
      function destroy() {
        modules.setState(
          (prevState) => {
            prevState.delete(value.id);
            return prevState;
          },
          {
            customEvents: [`${ENTITY_EVENTS.ON_ENTITY_DESTROY}-${value.id}`],
          }
        );
      }
      modules.setState(
        (prevState) =>
          prevState.set(value.id, {
            ...client,
            destroy,
          }),
        {
          customEvents: [`${ENTITY_EVENTS.ON_ENTITY_LOAD}-${value.id}`],
        }
      );
    },
    /**
     * Retrieves entity metadata (store + destroy handler) by id.
     */
    getEntityById: (id: string) => {
      return modules.getState().get(id) as A & { destroy: () => void };
    },
    /**
     * Subscribes to entity load events for a specific id.
     */
    onEntityLoad: (id: string, callback: (payload?: any) => void) => {
      return modules.subscribe((payload) => {
        callback();
      }, `${ENTITY_EVENTS.ON_ENTITY_LOAD}-${id}`);
    },
    /**
     * Subscribes to entity destroy events for a specific id.
     */
    onEntityDestroy: (id: string, callback: (payload?: any) => void) => {
      return modules.subscribe((payload) => {
        callback();
      }, `${ENTITY_EVENTS.ON_ENTITY_DESTROY}-${id}`);
    },
  };
};

export { createModuleInfrastructure };
