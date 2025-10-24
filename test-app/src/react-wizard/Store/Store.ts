import { createScopedObserver } from "@scoped-observer/core";
import { WIZARD_STORE_SCOPE, WizardStoreEvents } from "../types";
import { gettersFn } from "./getters";
import { mutationsFn } from "./mutations";
import { stateFn } from "./state";
import { wizzardSubscriptionFn } from "./wizzardSubscription";

class Store {
  private _observer = createScopedObserver([
    {
      scope: "WIZARD_STORE_SCOPE",
    },
  ]);
  subscribe = (eventName: string, callback: (payload: any) => void) => {
    return this._observer.subscribe({
      scope: "WIZARD_STORE_SCOPE",
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
      scope: "WIZARD_STORE_SCOPE",
      eventName: `${"WizardStoreEvents.CREATE_WIZARD"}-${id}`,
      payload: {
        id,
      },
    });
  };
  getClient = (id: string) => {
    return this.entities.get(id)!.client;
  };
  createEntity = (props: any, setSuccessRender: (success: boolean) => void) => {
    if (!this.entities.has(props.id)) {
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
        remove: (() => {
          setTimeout(() => {
            this._observer.dispatch({
              scope: WIZARD_STORE_SCOPE,
              eventName: `${WizardStoreEvents.CREATE_WIZARD}-${props.id}`,
              payload: {
                id: props.id,
              },
            });
          }, 0);
          return () => {
            return () => {
              this.entities.delete(props.id);
            };
          };
        })(),
      });
    }
  };
}

export { Store };
