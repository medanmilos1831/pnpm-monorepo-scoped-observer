import { createScopedObserver } from "@scoped-observer/core";
import { useState, useSyncExternalStore } from "react";
import {
  MACHINE_EVENT,
  MACHINE_SCOPE,
  type Event,
  type TransitionMap,
  type MachineConfig,
  type CreateMachineConfig,
} from "./types";

export class StateMachineInstance<S extends string, T extends string> {
  state: S;
  transition: TransitionMap<S, T>;
  config: CreateMachineConfig<S>;
  target = createScopedObserver([
    {
      scope: MACHINE_SCOPE,
    },
  ]);
  constructor(config: {
    machineConfig: MachineConfig<S, T>;
    config?: CreateMachineConfig<S>;
  }) {
    this.state = config.config?.initState || config.machineConfig.init;
    this.transition = config.machineConfig.transition;
    this.config = config.config || {};
  }
  handler = (event: Event<T>) => {
    const next = this.transition[this.state].on[event.type];
    if (!next) {
      console.warn(
        `[Machine] Invalid transition from "${this.state}" using type "${event.type}"`
      );
      return;
    }
    let prev = this.state;
    this.state = next;
    this.config.onChange?.(prev, this.state);
    this.target.dispatch({
      scope: MACHINE_SCOPE,
      eventName: MACHINE_EVENT,
    });
  };
  observer(): S {
    return useSyncExternalStore(
      (callback) => {
        return this.target.subscribe({
          scope: MACHINE_SCOPE,
          eventName: MACHINE_EVENT,
          callback,
        });
      },
      () => {
        return this.state as S;
      }
    ) as S;
  }
}
