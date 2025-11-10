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
  actions: (stateManager: ContextEntityPropType<S, M, G>) => A;
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

export interface IModuleClientAPI<S = any, M = any, G = any, A = any> {
  createContext: (props: any) => void;
  removeContext: (id: string) => void;
  getContextById: (id: string) => ModuleContextType<S, M, G, A>;
  hasContext: (id: string) => boolean;
  subscribe: (
    eventName: string,
    callback: (payload: any) => void
  ) => () => void;
}

export type ModuleInstanceType = ReturnType<typeof createModuleInstance>;
export type ModuleContextType<S = any, M = any, G = any, A = any> = {
  entity: ContextEntityPropType<S, M, G>;
  actions: A;
  subscribe: (
    eventName: string,
    callback: (payload: any) => void
  ) => () => void;
};
