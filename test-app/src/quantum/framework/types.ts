export interface IStore<S = any> {
  id: string;
  state: S;
}
export interface IModuleConfig<S = any> {
  name: string;
  store: (props: { id: string; state: S }) => IStore<S>;
}
