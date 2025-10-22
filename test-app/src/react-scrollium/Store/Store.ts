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
      onCreate: () => void;
      remove: () => void;
    }
  >();
  getEntity = (id: string) => {
    if (!this.entities.has(id)) {
      throw new Error(`Scrollium entity with id ${id} not found`);
    }
    return this.entities.get(id);
  };
  createEntity = (props: ScrolliumProps) => {
    if (!this.entities.has(props.id)) {
      const state = stateFn(props);
      const mutations = mutationsFn(state);
      const getters = gettersFn(state);
      const lifecycle = () =>
        this._observer.dispatch({
          scope: SCROLLIUM_STORE_SCOPE,
          eventName: `${ScrolliumStoreEvents.CREATE_SCROLLIUM}-${props.id}`,
          payload: {
            id: props.id,
          },
        });
      this.entities.set(props.id, {
        state,
        mutations,
        getters,
        onCreate: lifecycle,
        remove: () => {
          this.entities.delete(props.id);
          lifecycle();
        },
      });
    }
  };
}

export { Store };
