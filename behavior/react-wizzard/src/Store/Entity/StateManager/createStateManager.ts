import type { IWizardConfig } from "../../../types";
import { createState } from "./createState";
import { createMutations } from "./createMutations";
import { createGetters } from "./createGetters";

export function createStateManager(props: IWizardConfig) {
  const state = createState(props);
  const mutations = createMutations(state);
  const getters = createGetters(state);
  return {
    state,
    mutations,
    getters,
  };
}
