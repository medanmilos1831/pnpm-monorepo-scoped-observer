import { createObserver } from "../observer";
import {
  WIZARD_OBSERVER_SCOPE,
  WIZARD_STORE_SCOPE,
  WizardStoreEvents,
  type events,
  type IWizardConfig,
} from "../types";
import { gettersFn } from "./getters";
import { listeners } from "./listeners";
import { mountFn } from "./mount";
import { mutationsFn } from "./mutations";
import { stateFn } from "./state";

interface IEntity {
  state: ReturnType<typeof stateFn>;
  getters: ReturnType<typeof gettersFn>;
  mutations: ReturnType<typeof mutationsFn>;
  mount: () => void;
  addEventListener: (
    eventName: events,
    callback: (payload: any) => void
  ) => () => void;
}

const createStore = () => {
  const observer = createObserver(WIZARD_STORE_SCOPE);
  return {
    entities: new Map<string, IEntity>(),
    subscribe: observer.subscribe,
    getEntity(id: string) {
      return this.entities.get(id)!;
    },
    removeEntity(id: string) {
      this.entities.delete(id);
      observer.dispatch(`${WizardStoreEvents.CREATE_WIZARD}-${id}`, { id });
    },
    createEntity(props: IWizardConfig) {
      if (!this.entities.has(props.id)) {
        const entityObserver = createObserver(WIZARD_OBSERVER_SCOPE);
        const state = stateFn(props);
        const getters = gettersFn(state);
        const mutations = mutationsFn(state, getters, entityObserver);
        const mount = mountFn(this.entities, props, observer);
        this.entities.set(props.id, {
          state,
          getters,
          mutations,
          addEventListener: (eventName, callback) => {
            return entityObserver.subscribe(eventName, callback);
          },
          mount,
        });
      }
      return this.getEntity(props.id)!;
    },
  };
};

export { createStore };
