import type { core } from "../core/core";

export type CreateModuleConfigType<S = any, M = any, G = any, A = any> = {
  name: string;
  model: (props: any) => IModel<S, G, M>;
  modelClient: (
    model: ReturnType<typeof core.createStateManager>,
    broker: ReturnType<typeof core.createMessageBroker>
  ) => any;
};

export interface IModel<S, G, M> {
  id: string;
  state: S;
  mutations: (state: S) => M;
  getters: (state: S) => G;
}

export interface IModuleClientAPI<A = any> {
  createModel: (props: any) => void;
  removeModel: (id: string) => void;
  getModelById: (id: string) => A;
  hasModel: (id: string) => boolean;
  lifeCycle: {
    mount: (notify: () => void) => () => void;
    unmount: (notify: () => void) => () => void;
  };
}
