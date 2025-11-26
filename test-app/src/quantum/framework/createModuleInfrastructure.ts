import { core } from "../core/core";
import { createEntityInfrastructure } from "./createEntityInfrastructure";
import { ENTITY_EVENTS, type IModuleConfig } from "./types";

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
    createEntity: entityInfrastructure.createEntity,
    getEntityById: entityInfrastructure.getEntityById,
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
