import type { createModuleInstance } from "./createModuleInstance";

export type CreateModuleConfigType<
  S = any,
  M = any,
  G = any,
  A = any,
  L = any
> = {
  name: string;
  entity: (props: any) => EntityStateManagerType<S, G, M>;
  actions: (stateManager: ContextEntityPropType<S, M, G>, observer: any) => A;
  listeners: (stateManager: ContextEntityPropType<S, M, G>, observer: any) => L;
};

export type ContextEntityPropType<S, M = any, G = any> = {
  state: S;
  mutations: M;
  getters: G;
};

export type EntityStateManagerType<S, G, M> = {
  id: string;
  state: S;
  mutations: (state: S) => M;
  getters: (state: S) => G;
};

export interface IModuleClientAPI<S = any, M = any, G = any> {
  createContext: (props: any) => void;
  removeContext: (id: string) => void;
  getContextById: (id: string) => {
    entity: ContextEntityPropType<S, M, G>;
    actions: any;
    listeners: any;
  };
}

export type ModuleInstanceType = ReturnType<typeof createModuleInstance>;
export type ModuleEntityType<S = any, M = any, G = any> = {
  entity: ContextEntityPropType<S, M, G>;
  actions: any;
  listeners: any;
};
