import { createObserver } from "../observer";
import {
  WIZARD_STORE_SCOPE,
  WizardStoreEvents,
  type IEntity,
  type IWizardConfig,
} from "../types";
import { createEntity } from "./Entity/createEntity";

const createStore = () => {
  const storeObserver = createObserver(WIZARD_STORE_SCOPE);
  return {
    entities: new Map<string, IEntity>(),
    subscribe: storeObserver.subscribe,
    getEntity(id: string) {
      return this.entities.get(id)!;
    },
    removeEntity(id: string) {
      this.entities.delete(id);
      storeObserver.dispatch(`${WizardStoreEvents.CREATE_WIZARD}-${id}`, {
        id,
      });
    },
    createEntity(props: IWizardConfig) {
      if (!this.entities.has(props.id)) {
        this.entities.set(
          props.id,
          createEntity(props, storeObserver, this.entities)
        );
      }
      return this.getEntity(props.id)!;
    },
    getEntityClient(id: string) {
      return this.getEntity(id).getClient();
    },
  };
};

export { createStore };
