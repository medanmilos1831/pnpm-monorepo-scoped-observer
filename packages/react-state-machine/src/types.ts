import { IScopedObserver } from "@scoped-observer/core";

export const MACHINE_EVENT = "machineEvent";
export const MACHINE_SCOPE = "machineScope";

export type TransitionMap<S extends string, T extends string = string> = {
  [K in S]: {
    on: {
      [K2 in T]?: S;
    };
  };
};

export interface IStateMachine<S extends string, T extends string = string> {
  state: S;
  manager: IScopedObserver;
  transition: TransitionMap<S, T>;
  dispatch(payload: any): void;
  subscribe(cb: (data: { state: S; payload: any }) => void): () => void;
}
