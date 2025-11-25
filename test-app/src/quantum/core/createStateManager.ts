import type { IStateManager } from "../framework/types";

function createStateManager<S = any, M = any, G = any>(props: {
  id: string;
  state: S;
  mutations(state: S): M;
  getters(state: S): G;
}): IStateManager<S, M, G> {
  return {
    state: props.state,
    mutations: props.mutations(props.state),
    getters: props.getters(props.state),
  };
}

export { createStateManager };
