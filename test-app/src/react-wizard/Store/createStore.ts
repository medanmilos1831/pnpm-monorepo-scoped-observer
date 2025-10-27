import { createObserver } from "../observer";
import {
  WIZARD_OBSERVER_SCOPE,
  WIZARD_STEP_OBSERVER_SCOPE,
  WIZARD_STORE_SCOPE,
  WizardStoreEvents,
  type IEntity,
  type IWizardConfig,
} from "../types";
import { createGetters } from "./createGetters";
import { mountFn } from "./mount";
import { createMutations } from "./createMutations";
import { createState } from "./createState";
import { createNavigation } from "./createNavigation";

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
        const observer = createObserver(WIZARD_OBSERVER_SCOPE);
        const state = createState(props);
        const getters = createGetters(state);
        const mutations = createMutations(state, observer);
        const navigation = createNavigation(getters, mutations, observer);
        const mount = mountFn(this.entities, props, observer);
        this.entities.set(props.id, {
          state,
          getters,
          mutations,
          addEventListener: (event, callback) => {
            return observer.subscribe(event, ({ payload }) => {
              callback(payload);
            });
          },
          mount,
          navigation,
        });
      }
      return this.getEntity(props.id)!;
    },
  };
};

export { createStore };
