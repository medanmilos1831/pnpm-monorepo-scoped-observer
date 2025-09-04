import { useEffect, useState, useSyncExternalStore } from "react";
import { StateMachineInstance } from "./StateMachineInstance";
import {
  type GlobalConfig,
  type LocalConfig,
  type TransitionMap,
  type Event,
  MACHINE_SCOPE,
  MACHINE_EVENT,
} from "./types";
import { initialize } from "./utils";

const createMachine = <S extends string, T extends string>({
  machine,
  config,
}: {
  machine: {
    init: S;
    transition: TransitionMap<S, T>;
  };
  config?: GlobalConfig<S>;
}) => {
  const entities = new Map<
    StateMachineInstance<S, T>["handler"],
    StateMachineInstance<S, T>
  >();

  const globalConfig = config || {};

  const useWatch = (
    item: [S, (event: Event<T>) => void],
    callback: (state: S) => any
  ) => {
    const entity = entities.get(item[1])!;
    const state = useSyncExternalStore(
      (callback) => {
        return entity.target.subscribe({
          scope: MACHINE_SCOPE,
          eventName: MACHINE_EVENT,
          callback,
        });
      },
      () => {
        return entity.state as S;
      }
    );
    return callback(state);
  };

  const useMachine = (localConfig?: LocalConfig<S>): any => {
    const [instance] = useState(
      initialize.bind<any>({
        machineConfig: machine,
        config: {
          ...globalConfig,
          ...localConfig,
        },
        entities,
      })
    );
    const state = useWatch(
      [instance.state, instance.handler],
      (state) => state
    );
    return [state, instance.handler];
  };

  return {
    useMachine,

    useWatch,

    client: {
      getEntity: (item: [S, (event: Event<T>) => void]) => {
        const [state, handler] = item;
        const entity = entities.get(handler);
        if (!entity) {
          return {
            handler: (props: Event<T>) => {
              console.warn(`[Machine] Machine with handler not found.`);
            },
            state: machine.init,
          };
        }
        return {
          handler: entity.handler,
          state: entity.state,
        };
      },

      getEntityByName(name: string) {
        for (const [handler, instance] of entities.entries()) {
          if (instance.name === name) {
            return {
              handler: instance.handler,
              state: instance.state,
              name: instance.name,
            };
          }
        }
        return null;
      },
    },
  };
};

export { createMachine };
