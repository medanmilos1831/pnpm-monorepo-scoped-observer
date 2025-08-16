export type MutFn<DATA, P = any> = (data: DATA, payload: P) => DATA;
export type GetFn<DATA, R = any> = (data: DATA, ...args: any[]) => R;

export type Descriptor<
  DATA,
  MUTATIONS extends Record<string, MutFn<DATA>>,
  GETTERS extends Record<string, GetFn<DATA, any>>
> = {
  mutations: MUTATIONS;
  getters: GETTERS;
};

export type mutateParams<
  D extends Descriptor<any, any, any>,
  K extends keyof D['mutations']
> = {
  mutation: K;
  payload: Parameters<D['mutations'][K]>[1];
  runEvents?: string[];
};
