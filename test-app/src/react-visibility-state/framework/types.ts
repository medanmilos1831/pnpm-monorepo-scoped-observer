export type StateManagerInstance<E, M = any, G = any> = {
  state: E;
  mutations: M;
  getters: G;
};

export type CreateStateManagerProps<S> = {
  id: string;
  state: S;
  mutations: (state: S) => Record<string, (...args: any[]) => any>;
  getters: (state: S) => Record<string, (...args: any[]) => any>;
};

export interface IModule<S = any, M = any, G = any, A = any, L = any> {
  createEntity: (props: any) => any;
  removeEntity: (id: string) => any;
  getEntityById: (id: string) => {
    stateManager: StateManagerInstance<S, M, G>;
    actions: A;
    listeners: L;
  };
}

export type CreateModuleProps<S = any, M = any, G = any, A = any, L = any> = {
  name: string;
  entity: (props: any) => CreateStateManagerProps<S>;
  actions: (stateManager: StateManagerInstance<S, M, G>, observer: any) => A;
  listeners: (stateManager: StateManagerInstance<S, M, G>, observer: any) => L;
};
