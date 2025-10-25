import { createScopedObserver } from "@scoped-observer/core";
import {
  WIZARD_STORE_SCOPE,
  WizardStoreEvents,
  type IWizardConfig,
} from "../types";
import { gettersFn } from "./getters";
import { mutationsFn } from "./mutations";
import { stateFn } from "./state";
import { wizzardSubscriptionFn } from "./wizzardSubscription";

class Store {
  private _observer = createScopedObserver([
    {
      scope: WIZARD_STORE_SCOPE,
    },
  ]);
  subscribe = (eventName: string, callback: (payload: any) => void) => {
    return this._observer.subscribe({
      scope: WIZARD_STORE_SCOPE,
      eventName,
      callback,
    });
  };
  entities = new Map<string, any>();
  getEntity = (id: string) => {
    return this.entities.get(id)!;
  };
  removeEntity = (id: string) => {
    this.entities.delete(id);
    this._observer.dispatch({
      scope: WIZARD_STORE_SCOPE,
      eventName: `${WizardStoreEvents.CREATE_WIZARD}-${id}`,
      payload: {
        id,
      },
    });
  };
  getClient = (id: string) => {
    return this.entities.get(id)!.client;
  };
  createEntity = (
    props: IWizardConfig,
    setSuccessRender: (success: boolean) => void
  ) => {
    if (!this.entities.has(props.id)) {
      const event = () => {
        this._observer.dispatch({
          scope: WIZARD_STORE_SCOPE,
          eventName: `${WizardStoreEvents.CREATE_WIZARD}-${props.id}`,
          payload: {
            id: props.id,
          },
        });
      };
      const state = stateFn(props);
      const getters = gettersFn(state);
      const mutations = mutationsFn(state, getters);
      const wizzardSubscription = wizzardSubscriptionFn(
        getters,
        mutations,
        props,
        setSuccessRender
      );
      this.entities.set(props.id, {
        state,
        mutations,
        getters,
        wizzardSubscription,
        mount: () => {
          event();
          return () => {
            this.entities.delete(props.id);
            event();
          };
        },
      });
    }
    return this.getEntity(props.id)!;
  };
}

export { Store };
