import type { createScopedObserver } from "../../scroped-observer";
import {
  WIZARD_STORE_SCOPE,
  WizardStoreEvents,
} from "../../wizard/Store/types";
import { type IWizardConfig } from "../types";
import { gettersFn } from "./getters";

import { mutationsFn } from "./mutations";
import { createObserver } from "./observer";
import { stateFn } from "./state";

export function entityFn(
  props: IWizardConfig,
  observer: ReturnType<typeof createScopedObserver>,
  entitiesMap: Map<string, any>
) {
  const entityObserver = createObserver();
  const state = stateFn(props);
  const getters = gettersFn(state);
  const mutations = mutationsFn(state, getters, entityObserver);

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
    addEventListener: entityObserver.subscribe,
    mount: () => {
      event();
      return () => {
        entitiesMap.delete(props.id);
        event();
      };
    },
  };
}
