import { createScopedObserver } from "@scoped-observer/core";
import { createClient } from "./Entity";
import {
  SCROLLIUM_STORE_SCOPE,
  ScrolliumStoreEvents,
  type ScrolliumProps,
} from "../types";
import { ScrollState } from "./Entity/ScrollState";

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
  entities = new Map<
    string,
    {
      client: ScrollState;
    }
  >();
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
  createEntity = (props: ScrolliumProps) => {
    if (!this.entities.has(props.id)) {
      const client = createClient(props);
      this.entities.set(props.id, {
        client: new ScrollState(props),
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
