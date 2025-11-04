import { createStateManager } from "../../core/createStateManager";

export function createVisibilityState(props: any) {
  return createStateManager({
    id: "visibility-state",
    state: {},
    mutations(state) {
      return {};
    },
    getters(state) {
      return {};
    },
  });
}
