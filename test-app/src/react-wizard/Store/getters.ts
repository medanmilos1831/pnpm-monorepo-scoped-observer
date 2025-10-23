import { stateFn } from "./state";

export function getters(state: ReturnType<typeof stateFn>) {
  return {
    subscribe: state.observer.subscribe,
  };
}
