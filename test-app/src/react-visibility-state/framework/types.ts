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

export interface IContext<S = any, M = any, G = any> {
  createEntity: (props: any) => any;
  removeEntity: (id: string) => any;
  getEntityById: (id: string) => StateManagerInstance<S, M, G>;
}
