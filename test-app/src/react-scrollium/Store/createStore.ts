import { createObserver } from "../../react-wizard/observer";
import {
  SCROLLIUM_STORE_SCOPE,
  ScrolliumStoreEvents,
  type ScrolliumProps,
} from "../types";

const createStore = () => {
  const storeObserver = createObserver(SCROLLIUM_STORE_SCOPE);
  return {
    entities: new Map<string, any>(),
    subscribe: storeObserver.subscribe,
    getEntity(id: string) {
      return this.entities.get(id)!;
    },
    removeEntity(id: string) {
      this.entities.delete(id);
      storeObserver.dispatch(`${ScrolliumStoreEvents.CREATE_SCROLLIUM}-${id}`, {
        id,
      });
    },
    createEntity(props: ScrolliumProps) {
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
