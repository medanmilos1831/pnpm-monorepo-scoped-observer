import type { ScrolliumProps } from "../../../types";
import { createState } from "./createState";
import { createMutations } from "./createMutations";
import { createGetters } from "./createGetters";

export function createStateManager(props: ScrolliumProps) {
  const state = createState(props);
  console.log("createStateManager", state);
  const mutations = createMutations(state);
  const getters = createGetters(state);
  return {
    state,
    mutations,
    getters,
  };
}
