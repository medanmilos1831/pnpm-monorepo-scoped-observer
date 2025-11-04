import { createStateManager } from "../../core/createStateManager";
import type { initialStateType } from "../../types";

export function createVisibilityState(props: any) {
  return createStateManager({
    id: props.id,
    state: {
      visibility: props.initState,
    },
    mutations(state) {
      return {
        setVisibility: (visibility: initialStateType) => {
          state.visibility = visibility;
        },
      };
    },
    getters(state) {
      return {
        getVisibility: () => state.visibility,
      };
    },
  });
}
