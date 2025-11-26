import { core } from "../core/core";
import type { IModuleConfig } from "./types";

const ENTITY_EVENTS = {
  ON_ENTITY_LOAD: "onEntityLoad",
  ON_ENTITY_DESTROY: "onEntityDestroy",
};
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

  return {
    createEntity: ({ id, state }: { id: string; state: S }) => {
      if (modules.state.has(id)) {
        return;
      }
      modules.setState(
        (prevState) => {
          const model = moduleConfig.store({
            id,
            state,
          });
          return prevState.set(id, {
            store: core.createStore(model.state),
            destroy() {
              modules.state.delete(id);
              modules.setState(
                (prev) => {
                  return prev;
                },
                {
                  customEvents: [`${ENTITY_EVENTS.ON_ENTITY_DESTROY}-${id}`],
                }
              );
            },
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
    onEntityLoad: (id: string, callback: (payload?: any) => void) => {
      return modules.subscribe((payload) => {
        callback({
          newState: Array.from(payload.newState.values()),
          prevState: Array.from(payload.prevState.values()),
        });
      }, `${ENTITY_EVENTS.ON_ENTITY_LOAD}-${id}`);
    },
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
