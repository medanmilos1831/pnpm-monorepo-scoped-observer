import { core } from "../core/core";
import type { IModel, IModuleConfig } from "./types";

const createModuleInfrastructure = <S>(moduleConfig: IModuleConfig<S>) => {
  const modules = core.createStore(
    new Map<
      string,
      {
        model: IModel<S>;
        removeModel: () => void;
      }
    >()
  );

  return {
    createModel: ({ id, state: modelState }: { id: string; state: S }) => {
      modules.setState(
        (prevState) => {
          const model = moduleConfig.model({
            id,
            state: modelState,
          });
          return prevState.set(id, {
            model,
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
      return modules.state.get(id)?.model;
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
