import type { createModuleInstance } from "./createModuleInstance";

type SubscribeType = (
  eventName: string,
  callback: (payload: any) => void
) => () => void;

export type CreateModuleConfigType<S = any, M = any, G = any, A = any> = {
  name: string;
  entity: (props: any) => EntityStateManagerType<S, G, M>;
  modelApiClient: (
    entity: ModelEntityPropType<S, M, G>,
    dispatch: (eventName: string, payload: any) => void,
    subscribe: SubscribeType
  ) => A;
};

export type ModelEntityPropType<S, M = any, G = any> = {
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

export interface IModuleClientAPI<A = any> {
  createModel: (props: any) => void;
  removeModel: (id: string) => void;
  getModelById: (id: string) => A;
  hasModel: (id: string) => boolean;
  subscribe: SubscribeType;
  lifeCycle: (id: string) => void;
}

export type ModuleInstanceType = ReturnType<typeof createModuleInstance>;
