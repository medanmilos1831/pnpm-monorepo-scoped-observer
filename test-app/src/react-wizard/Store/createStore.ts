import { createObserver } from "../observer";
import {
  WIZARD_OBSERVER_SCOPE,
  WIZARD_STORE_SCOPE,
  WizardStoreEvents,
  type IEntity,
  type IWizardConfig,
} from "../types";
import { createCommands } from "./createCommands";
import { createNavigation } from "./createNavigation";
import { mountFn } from "./mount";
import { createStateManager } from "./StateManager/createStateManager";

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
        const stateManager = createStateManager(props);
        const navigation = createNavigation(stateManager, observer);
        const commands = createCommands(stateManager, navigation, observer);
        const mount = mountFn(this.entities, props, observer);
        this.entities.set(props.id, {
          stateManager,
          commands,
          navigation,
          addEventListener: (event, callback) => {
            return observer.subscribe(event, ({ payload }) => {
              callback(payload);
            });
          },
          subscribe: observer.subscribe,
          mount,
        });
      }
      return this.getEntity(props.id)!;
    },
  };
};

export { createStore };
