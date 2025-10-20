import { createScopedObserver } from "@scoped-observer/core";
import { createClient } from "./Entity";
import { SCROLLIUM_STORE_SCOPE, ScrolliumStoreEvents } from "./types";

class Store {
  private _observer = createScopedObserver([
    {
      scope: SCROLLIUM_STORE_SCOPE,
    },
  ]);
  subscribe = (eventName: string, callback: (payload: any) => void) => {
    return this._observer.subscribe({
      scope: SCROLLIUM_STORE_SCOPE,
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
      scope: SCROLLIUM_STORE_SCOPE,
      eventName: `${ScrolliumStoreEvents.CREATE_SCROLLIUM}-${id}`,
      payload: { id },
    });
  };
  createEntity = (props: { id: string }) => {
    if (!this.entities.has(props.id)) {
      const client = createClient({ id: props.id });
      this.entities.set(props.id, {
        client,
      });
    }
    return () => {
      this._observer.dispatch({
        scope: SCROLLIUM_STORE_SCOPE,
        eventName: `${ScrolliumStoreEvents.CREATE_SCROLLIUM}-${props.id}`,
        payload: {
          id: props.id,
        },
      });
      return () => {
        this.removeEntity(props.id);
      };
    };
  };
}

export { Store };
