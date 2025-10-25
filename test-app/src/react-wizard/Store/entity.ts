import type { createScopedObserver } from "../../scroped-observer";
import type { Observer } from "../../wizard/Store/Entity/Observer";
import {
  WIZARD_STORE_SCOPE,
  WizardStoreEvents,
} from "../../wizard/Store/types";
import type { IWizardConfig } from "../types";
import { gettersFn } from "./getters";
import { mutationsFn } from "./mutations";
import { stateFn } from "./state";
import { wizzardSubscriptionFn } from "./wizzardSubscription";

export function entityFn(
  props: IWizardConfig,
  observer: ReturnType<typeof createScopedObserver>,
  entitiesMap: Map<string, any>,
  setSuccessRender: (success: boolean) => void
) {
  const state = stateFn(props);
  const getters = gettersFn(state);
  const mutations = mutationsFn(state, getters);
  const wizzardSubscription = wizzardSubscriptionFn(
    getters,
    mutations,
    props,
    setSuccessRender
  );
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
    mount: () => {
      return () => {
        entitiesMap.delete(props.id);
        event();
      };
    },
    wizzardSubscription,
    getWizardData() {
      return {
        activeStep: this.getters.getActiveStep(),
        nextStep: this.getters.getNextStep(),
        previousStep: this.getters.getPreviousStep(),
        isLast: this.getters.isLast(),
        isFirst: this.getters.isFirst(),
        steps: this.getters.getSteps(),
        wizardId: this.getters.getWizardId(),
        subscribe: this.getters.subscribe,
      };
    },
  };
}
