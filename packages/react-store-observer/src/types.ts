type MutationFn<T> = (this: T, payload?: any) => void;
type GetterFn<T> = (this: T, params?: any) => any;

export interface IGenerateStore {
  data: any;
  mutations: { [key: string]: MutationFn<any> };
  getters: { [key: string]: GetterFn<any> };
}

export type generateStoreParamType<TModules> = {
  [K in keyof TModules]: {
    data: TModules[K];
    mutations: {
      [key: string]: MutationFn<TModules[K]>;
    } & ThisType<TModules[K]>;
    getters: {
      [key: string]: GetterFn<TModules[K]>;
    } & ThisType<TModules[K]>;
  };
};

export type Module<TData> = {
  data: TData;
};

export type ModulesMap<TModules extends Record<string, any>> = {
  [K in keyof TModules]: Module<TModules[K]>;
};

export type Mutation = {
  scope: string;
  commit: string;
  payload?: any;
};
