import type { core } from "../core/core";

/**
 * Canonical shape of an entity store managed by the framework.
 */
export interface IStore<S = any> {
  id: string;
  state: S;
}

/**
 * Module configuration contract used when calling `createModule`.
 */
export interface IModuleConfig<S = any, A = any> {
  name: string;
  onCreateEntity: (props: { id: string; state: S }) => IStore<S>;
  clientSchema: (store: ReturnType<typeof core.createStore<S>>) => A;
}

/**
 * Options for setState method.
 */
export interface ISetStateOptions {
  customEvents?: string[];
}

/**
 * Type for setState method in createStore.
 */
export type ISetState<S = any> = (
  callback: (state: S) => S,
  options?: ISetStateOptions
) => void;

/**
 * Type for getState method in createStore.
 */
export type IGetState<S = any> = () => S;

/**
 * Type for subscribe method in createStore.
 */
export type ISubscribe<S = any> = (
  callback: (payload?: S) => void,
  eventName?: string
) => () => void;

/**
 * Event names dispatched when entity lifecycle changes occur.
 */
export const ENTITY_EVENTS = {
  ON_ENTITY_LOAD: "onEntityLoad",
  ON_ENTITY_DESTROY: "onEntityDestroy",
};
