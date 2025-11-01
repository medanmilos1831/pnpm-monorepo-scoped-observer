import { createObserver } from "./observer";

function createStateManager<
  S,
  M extends Record<string, (...args: any[]) => any>,
  G extends Record<string, (...args: any[]) => any>
>(props: {
  id: string;
  state: S;
  mutations(state: S): M;
  getters(state: S): G;
}) {
  const observer = createObserver(props.id);
  return {
    state: props.state,
    mutations: props.mutations(props.state),
    getters: props.getters(props.state),
    observer,
  };
}

export { createStateManager };
