import { useEffect, useState } from "react";
import { StateMachineInstance } from "./StateMachineInstance";
import type { GlobalConfig, LocalConfig, TransitionMap, Event } from "./types";
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

  return {
    useMachine: (
      localConfig?: LocalConfig<S>
    ): [S, (event: Event<T>) => void] => {
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

      useEffect(() => {
        return () => {
          entities.delete(instance.handler);
        };
      }, []);

      return [instance.observer(), instance.handler];
    },

    useWatch(
      item: [S, (event: Event<T>) => void],
      callback: (state: S) => any
    ) {
      const entity = entities.get(item[1])!;
      return callback(entity.observer());
    },

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
