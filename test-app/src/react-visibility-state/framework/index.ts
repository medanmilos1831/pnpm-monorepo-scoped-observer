import { createScopedObserver } from "@scoped-observer/core";

const STORE_OBSERVER = "STORE_OBSERVER";

export const framework = (() => {
  function createStateManager<
    S,
    M extends Record<string, (...args: any[]) => any>,
    G extends Record<string, (...args: any[]) => any>
  >(props: {
    id: string;
    state: S;
    mutations(state: S): M;
    getters(state: S): G;
  }) {
    return {
      state: props.state,
      mutations: props.mutations(props.state),
      getters: props.getters(props.state),
    };
  }
  function createObserver(scope: string) {
    const observer = createScopedObserver([
      {
        scope,
      },
    ]);
    return {
      dispatch: (eventName: string, payload?: any) => {
        observer.dispatch({
          scope,
          eventName,
          payload: payload || undefined,
        });
      },
      subscribe: (eventName: string, callback: (payload: any) => void) => {
        return observer.subscribe({
          scope,
          eventName,
          callback,
        });
      },
    };
  }

  const store = createStateManager({
    id: "STORE",
    state: new Map<string, any>(),
    mutations(state) {
      return {
        createEntity<P extends { id: string }>(props: P, entity: () => any) {
          if (!state.has(props.id)) {
            state.set(props.id, entity());
          }
        },
        removeEntity: (id: string) => {
          state.delete(id);
        },
      };
    },
    getters(state) {
      return {
        getEntityById: (id: string) => state.get(id)!,

        getEntity: (id: string) => state.get(id),

        hasEntity: (id: string) => state.has(id),

        getAllEntities: () => state.values(),

        getEntityCount: () => state.size,
      };
    },
  });
  const observer = createObserver(STORE_OBSERVER);
  return {
    // createStateManager,
    createObserver,
    createModule: function <S, C>(
      stateManager: S,
      callback: (
        state: S,
        context: {
          getStore: () => ReturnType<typeof createStateManager>;
          getObserver: () => ReturnType<typeof createObserver>;
        }
      ) => C
    ) {
      return callback(stateManager, {
        getStore: () => store,
        getObserver: () => observer,
      });
    },
    createStateManager: function <
      S,
      M extends Record<string, (...args: any[]) => any>,
      G extends Record<string, (...args: any[]) => any>
    >(props: {
      id: string;
      state: S;
      mutations(state: S): M;
      getters(state: S): G;
    }) {
      store.mutations.createEntity({ id: props.id }, () => {
        return createStateManager(props);
      });
      return {
        createModule(callback: (state: S) => any) {
          return callback(store.getters.getEntity(props.id));
        },
      };
      // return stateManager;
    },
  };
})();
