import { core } from "../core/core";
import type { IModuleConfig } from "./types";

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
    createStore: ({ id, state }: { id: string; state: S }) => {
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
                  customEvents: [`onStoreDestroy-${id}`],
                }
              );
            },
          });
        },
        {
          customEvents: [`onStoreCreate-${id}`],
        }
      );
    },
    getStoreById: (id: string) => {
      return modules.state.get(id);
    },
    subscribe: (callback: (payload?: any) => void, eventName?: string) => {
      return modules.subscribe((payload) => {
        callback({
          newState: Array.from(payload.newState.values()),
          prevState: Array.from(payload.prevState.values()),
        });
      }, eventName);
    },
  };
};

export { createModuleInfrastructure };
