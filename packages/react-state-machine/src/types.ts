import { IEventManager } from '../scoped-observer/types';

export const MACHINE_EVENT = 'machineEvent';
export const MACHINE_SCOPE = 'machineScope';

export interface IStateMachine<S extends string> {
  state: S;
  manager: IEventManager;
  transition: TransitionMap<S>;
  dispatch(payload: any): void;
  subscribe(cb: (data: { state: S; payload: any }) => void): () => void;
}
export type TransitionMap<S extends string> = {
  [K in S]: {
    handle(): S;
  };
};
