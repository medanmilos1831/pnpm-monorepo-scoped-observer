import { createScopedObserver } from "@scoped-observer/core";
import {
  SCROLLIUM_STORE_SCOPE,
  ScrolliumAxis,
  ScrolliumStoreEvents,
  type ScrolliumProps,
} from "../types";
import { getters as gettersFn } from "./getters";
import { mutations as mutationsFn } from "./mutations";
import { stateFn } from "./state";
import { getScrolliumData } from "../utils";

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
      onScroll: (props: any) => void;
      style: React.CSSProperties;
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
        onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
          const self = this.getEntity(props.id)!;
          self.mutations.setScrollPosition(
            getters.getAxis() === ScrolliumAxis.VERTICAL
              ? (e.target as HTMLDivElement).scrollTop
              : (e.target as HTMLDivElement).scrollLeft
          );
          if (props.onScroll) {
            props.onScroll(getScrolliumData(self.getters));
          }
        },
        style: {
          height: "100%",
          width: "100%",
          overflow:
            props.axis === ScrolliumAxis.HORIZONTAL
              ? "auto hidden"
              : "hidden auto",
        },
      });
    }
  };
}

export { Store };
