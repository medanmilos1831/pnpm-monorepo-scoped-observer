export interface IModel<S = any> {
  id: string;
  state: S;
}
export interface IModuleConfig<S = any> {
  name: string;
  model: (props: { id: string; state: S }) => IModel<S>;
}
