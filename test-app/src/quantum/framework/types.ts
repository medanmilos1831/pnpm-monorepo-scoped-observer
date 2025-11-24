import type { core } from "../core/core";

export interface IModuleConfig {
  id: string;
  model: (props: any) => any;
  modelClient: (model: any, broker: any) => any;
}

// type modelClientType<A = any> = (
//   model: ReturnType<typeof core.createStateManager>,
//   broker: ReturnType<typeof core.createMessageBroker>
// ) => A;

// type modelType<S = any, G = any, M = any> = (props: {
//   id: string;
//   state: S;
// }) => IModel<S, G, M>;

// export type CreateModuleConfigType<S = any, M = any, G = any, A = any> = {
//   name: string;
//   model: modelType<S, G, M>;
//   modelClient: (
//     model: IModel<S, G, M>,
//     broker: ReturnType<typeof core.createMessageBroker>
//   ) => any;
// };

// export interface IModel<S, G, M> {
//   id: string;
//   state: S;
//   mutations: (state: S) => M;
//   getters: (state: S) => G;
// }

// export interface IModuleClientAPI<A = any> {
//   createModel: (props: any) => void;
//   removeModel: (id: string) => void;
//   getModelById: (id: string) => A;
//   hasModel: (id: string) => boolean;
//   lifeCycle: {
//     mount: (notify: () => void) => () => void;
//     unmount: (notify: () => void) => () => void;
//   };
// }

// export interface IModules<A = any> {
//   modelClient: modelClientType<A>;
//   destroyModel: () => void;
// }
