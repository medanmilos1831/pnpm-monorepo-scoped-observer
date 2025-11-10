import type { createModuleInstance } from "./createModuleInstance";

type SubscribeType = (
  eventName: string,
  callback: (payload: any) => void
) => () => void;

export type CreateModuleConfigType<S = any, M = any, G = any, A = any> = {
  name: string;
  entity: (props: any) => EntityStateManagerType<S, G, M>;
  contextApiClient: (
    entity: ContextEntityPropType<S, M, G>,
    dispatch: (eventName: string, payload: any) => void,
    subscribe: SubscribeType
  ) => A;
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
  getContextById: (id: string) => A;
  hasContext: (id: string) => boolean;
  moduleSubscribe: SubscribeType;
}

export type ModuleInstanceType = ReturnType<typeof createModuleInstance>;
