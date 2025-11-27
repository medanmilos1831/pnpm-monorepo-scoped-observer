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
  apiClient: (store: ReturnType<typeof core.createStore<S>>) => A;
}

/**
 * Event names dispatched when entity lifecycle changes occur.
 */
export const ENTITY_EVENTS = {
  ON_ENTITY_LOAD: "onEntityLoad",
  ON_ENTITY_DESTROY: "onEntityDestroy",
};
