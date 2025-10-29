import { createObserver } from "../../observer";
import { SCROLLIUM_SCOPE, type ScrolliumProps } from "../types";
import { stateFn } from "./state";

const createEntity = (
  props: ScrolliumProps,
  storeObserver: ReturnType<typeof createObserver>
) => {
  const observer = createObserver(SCROLLIUM_SCOPE);
  const state = stateFn(props);
  const mutations = mutationsFn(state);
  const getters = gettersFn(state);
  return {
    state,
    mutations,
    getters,
  };
};
