import { framework } from ".";
import type { VisibilityProps } from "../types";

export function createEntityStateManager(props: VisibilityProps) {
  return framework.createStateManager({
    id: props.id,
    state: {
      visibility: props.initState,
    },
    mutations(state) {
      return {
        setVisibility: (visibility) => {
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
