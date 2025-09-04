import { useEffect, useState } from "react";
import { StateMachineInstance } from "./StateMachineInstance";
import type { CreateMachineConfig, TransitionMap, Event } from "./types";
import { initialize } from "./utils";

const createMachine = <S extends string, T extends string>({
  machine,
  config,
}: {
  machine: {
    init: S;
    transition: TransitionMap<S, T>;
  };
  config?: CreateMachineConfig<S>;
}) => {
  const entities = new Map<
    StateMachineInstance<S, T>["handler"],
    StateMachineInstance<S, T>
  >();
  const globalConfig = config || {};

  return {
    useMachine: (
      config?: CreateMachineConfig<S>
    ): [S, (event: Event<T>) => void] => {
      // INITIALIZE THE MACHINE INSTANCE
      const [instance] = useState(
        initialize.bind<any>({
          machineConfig: machine,
          config: config || globalConfig,
          entities,
        })
      );
      // END ::INITIALIZE THE MACHINE INSTANCE
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
      getEntity: ([state, handler]: [S, (event: Event<T>) => void]) => {
        if (!entities.has(handler)) {
          return {
            handler: (props: Event<T>) => {
              console.warn(
                `[Machine] Machine with handler "${handler}" not found.`
              );
            },
            state: machine.init,
          };
        }
        return {
          handler: entities.get(handler)!.handler,
          state: entities.get(handler)!.state,
        };
      },
    },
  };
};

export { createMachine };
