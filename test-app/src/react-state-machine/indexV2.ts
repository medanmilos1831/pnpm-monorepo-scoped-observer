import { useEffect, useState } from "react";
import { StateMachineInstance } from "./StateMachineInstance";
import type { CreateMachineV2Config, TransitionMap, Event } from "./types2";
import { initializeTwo } from "./utils";

const createMachineV2 = <S extends string, T extends string>({
  machine,
  config,
}: {
  machine: {
    init: S;
    transition: TransitionMap<S, T>;
  };
  config?: CreateMachineV2Config<S>;
}) => {
  const entities = new Map<
    StateMachineInstance<S, T>["handler"],
    StateMachineInstance<S, T>
  >();
  const globalConfig = config || {};

  return {
    useMachineV2: (
      config?: CreateMachineV2Config<S>
    ): [S, (event: Event<T>) => void] => {
      // INITIALIZE THE MACHINE INSTANCE
      const [instance] = useState(
        initializeTwo.bind({
          machineConfig: machine,
          config: config || globalConfig,
          entities,
        }) as any
      );
      // END ::INITIALIZE THE MACHINE INSTANCE
      // instance.machineInstance.observer();
      useEffect(() => {
        return () => {
          entities.delete(instance.handler);
        };
      }, []);

      return [instance.observer(), instance.handler];
    },
    useWatch(api: [S, (event: Event<T>) => void], callback: (state: S) => any) {
      const entity = entities.get(api[1])!;
      return callback(entity.observer());
    },
    client: {
      getEntity: (handler: StateMachineInstance<S, T>["handler"]) => {
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

export { createMachineV2 };
