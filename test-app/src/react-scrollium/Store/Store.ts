import { createScopedObserver } from "@scoped-observer/core";
import {
  SCROLLIUM_STORE_SCOPE,
  ScrolliumStoreEvents,
  type ScrolliumProps,
} from "../types";
import { getters as gettersFn } from "./Entity/getters";
import { mutations as mutationsFn } from "./Entity/mutations";
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
      client: {
        state: ScrollState;
        mutations: ReturnType<typeof mutationsFn>;
        getters: ReturnType<typeof gettersFn>;
      };
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
      const state = new ScrollState(props);
      const mutations = mutationsFn(state);
      const getters = gettersFn(state);
      this.entities.set(props.id, {
        // client: new ScrollState(props),
        client: {
          state,
          mutations,
          getters,
        },
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
