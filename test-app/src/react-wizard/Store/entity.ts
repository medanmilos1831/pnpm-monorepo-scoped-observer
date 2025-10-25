import type { createScopedObserver } from "../../scroped-observer";
import {
  WIZARD_STORE_SCOPE,
  WizardStoreEvents,
} from "../../wizard/Store/types";
import { WizardEvents, type IWizardConfig } from "../types";
import { gettersFn } from "./getters";
import { mutationsFn } from "./mutations";
import { stateFn } from "./state";
import { listeners } from "./listeners";

export function entityFn(
  props: IWizardConfig,
  observer: ReturnType<typeof createScopedObserver>,
  entitiesMap: Map<string, any>
) {
  const state = stateFn(props);
  const getters = gettersFn(state);
  const mutations = mutationsFn(state, getters);
  const addEventListener = listeners(state.observer.subscribe);

  const event = () => {
    observer.dispatch({
      scope: WIZARD_STORE_SCOPE,
      eventName: `${WizardStoreEvents.CREATE_WIZARD}-${props.id}`,
      payload: {
        id: props.id,
      },
    });
  };
  return {
    state,
    getters,
    mutations,
    addEventListener,
    mount: () => {
      return () => {
        entitiesMap.delete(props.id);
        event();
      };
    },
  };
}
