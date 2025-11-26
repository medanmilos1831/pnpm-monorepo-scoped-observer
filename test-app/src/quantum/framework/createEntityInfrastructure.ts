import { core } from "../core/core";
import { ENTITY_EVENTS, type IModuleConfig } from "./types";

const createEntityInfrastructure = <S>(
  modules: ReturnType<
    typeof core.createStore<
      Map<
        string,
        { store: ReturnType<typeof core.createStore<S>>; destroy: () => void }
      >
    >
  >,
  moduleConfig: IModuleConfig<S>
) => {
  function destroy(id: string) {
    return () => {
      modules.state.delete(id);
      modules.setState(
        (prev) => {
          return prev;
        },
        {
          customEvents: [`${ENTITY_EVENTS.ON_ENTITY_DESTROY}-${id}`],
        }
      );
    };
  }
  function createStore(id: string, state: S) {
    return core.createStore(
      moduleConfig.store({
        id,
        state,
      }).state
    );
  }
  return {
    createEntity: ({ id, state }: { id: string; state: S }) => {
      if (modules.state.has(id)) {
        return;
      }
      modules.setState(
        (prevState) => {
          return prevState.set(id, {
            store: createStore(id, state),
            destroy: destroy(id),
          });
        },
        {
          customEvents: [`${ENTITY_EVENTS.ON_ENTITY_LOAD}-${id}`],
        }
      );
    },
    getEntityById: (id: string) => {
      return modules.state.get(id);
    },
  };
};

export { createEntityInfrastructure };
