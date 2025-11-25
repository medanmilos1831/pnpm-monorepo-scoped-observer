import { core } from "../core/core";
import type { IModel, IModuleConfig } from "./types";

const createModuleInfrastructure = <S>(moduleConfig: IModuleConfig<S>) => {
  const modules = core.createStore(
    new Map<
      string,
      {
        model: ReturnType<typeof core.createStore<S>>;
        removeModel: () => void;
      }
    >()
  );

  return {
    createModel: ({ id, state: modelState }: { id: string; state: S }) => {
      if (modules.state.has(id)) {
        return;
      }
      modules.setState(
        (prevState) => {
          const model = moduleConfig.model({
            id,
            state: modelState,
          });
          const store = core.createStore(model.state);
          return prevState.set(id, {
            model: store,
            removeModel() {
              modules.setState(
                (prevState) => {
                  prevState.delete(id);
                  return { ...prevState };
                },
                {
                  customEvents: [`onModelUnmount-${id}`],
                }
              );
            },
          });
        },
        {
          customEvents: [`onModelMount-${id}`],
        }
      );
    },
    getModelById: (id: string) => {
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
