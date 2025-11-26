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
export interface IModuleConfig<S = any> {
  name: string;
  store: (props: { id: string; state: S }) => IStore<S>;
}

/**
 * Event names dispatched when entity lifecycle changes occur.
 */
export const ENTITY_EVENTS = {
  ON_ENTITY_LOAD: "onEntityLoad",
  ON_ENTITY_DESTROY: "onEntityDestroy",
};

/**
 * Backing store that keeps track of every entity instance inside a module.
 */
export type ModuleEntitiesStore<S> = ReturnType<
  typeof core.createStore<
    Map<
      string,
      {
        destroy: () => void;
        getState: () => S;
        subscribe: (
          callback: (payload?: any) => void,
          eventName?: string
        ) => void;
        setState: (
          callback: (state: S) => S,
          options?: {
            customEvents: string[];
          }
        ) => void;
      }
    >
  >
>;
