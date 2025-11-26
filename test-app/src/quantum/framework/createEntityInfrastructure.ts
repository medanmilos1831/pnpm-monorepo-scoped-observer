import { core } from "../core/core";
import {
  ENTITY_EVENTS,
  type IModuleConfig,
  type ModuleEntitiesStore,
} from "./types";

/**
 * Builds infrastructure responsible for entity lifecycle within a module.
 * It mirrors a registry of entity stores in the shared `modules` store and
 * dispatches entity load/destroy events consumers can listen to.
 */
const createEntityInfrastructure = <S>(
  modules: ModuleEntitiesStore<S>,
  moduleConfig: IModuleConfig<S>
) => {
  /**
   * Returns a destroy handler bound to an entity id. When called,
   * the entity is removed and `onEntityDestroy-{id}` is emitted.
   */
  function destroy(id: string) {
    return () => {
      modules.state.delete(id);
      modules.setState((prev) => prev, {
        customEvents: [`${ENTITY_EVENTS.ON_ENTITY_DESTROY}-${id}`],
      });
    };
  }

  /**
   * Creates a fresh store for the entity using the module configuration.
   */
  function createStore(id: string, state: S) {
    return core.createStore(
      moduleConfig.store({
        id,
        state,
      }).state
    );
  }

  return {
    /**
     * Registers a new entity if the id is unused and emits `onEntityLoad-{id}`.
     */
    createEntity: ({ id, state }: { id: string; state: S }) => {
      const store = createStore(id, state);
      if (modules.state.has(id)) {
        return;
      }
      modules.setState(
        (prevState) =>
          prevState.set(id, {
            destroy: destroy(id),
            getState: () => {
              return store.state as S;
            },
            subscribe: store.subscribe,
            setState: store.setState,
          }),
        {
          customEvents: [`${ENTITY_EVENTS.ON_ENTITY_LOAD}-${id}`],
        }
      );
    },
    /**
     * Retrieves the entity entry for the provided id, if present.
     */
    getEntityById: (id: string) => {
      return modules.state.get(id);
    },
  };
};

export { createEntityInfrastructure };
