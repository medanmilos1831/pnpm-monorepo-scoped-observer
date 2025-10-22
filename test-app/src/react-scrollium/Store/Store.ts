import { createScopedObserver } from "@scoped-observer/core";
import {
  SCROLLIUM_STORE_SCOPE,
  ScrolliumStoreEvents,
  type ScrolliumProps,
} from "../types";
import { getters as gettersFn } from "./getters";
import { mutations as mutationsFn } from "./mutations";
import { stateFn } from "./state";

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
      state: ReturnType<typeof stateFn>;
      mutations: ReturnType<typeof mutationsFn>;
      getters: ReturnType<typeof gettersFn>;
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
      const state = stateFn(props);
      const mutations = mutationsFn(state);
      const getters = gettersFn(state);
      this.entities.set(props.id, {
        state,
        mutations,
        getters,
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
