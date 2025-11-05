import { createScopedObserver } from "@scoped-observer/core";

type ModuleFactory<S, T> = (state: S) => T;
type ModuleMap<S> = Record<string, ModuleFactory<S, any>>;

export const frameworkBase = (() => {
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
  function createModuleInstance<S, M extends ModuleMap<S>>(
    state: S,
    modules: M
  ) {
    type Built = { [K in keyof M]: ReturnType<M[K]> };
    const built = {} as Built;
    (Object.keys(modules) as Array<keyof M>).forEach((key) => {
      built[key] = modules[key](state);
    });
    return built;
  }
  function createObserver(scope: string) {
    const observer = createScopedObserver([
      {
        scope,
      },
    ]);
    return {
      scope,
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
  function createEntity(props: any) {
    const observer = frameworkBase.createObserver("ENTITY_OBSERVER");
    const stateManager = frameworkBase.createStateManager({
      id: props.id,
      state: {
        visibility: props.initState,
      },
      mutations(state) {
        return {
          setVisibility: (visibility: any) => {
            state.visibility = visibility;
          },
        };
      },
      getters(state) {
        return {
          getVisibility: () => state.visibility,
        };
      },
    });
    const entity = {
      observer,
      stateManager,
    };
    return entity;
  }
  return {
    createStateManager,
    createModuleInstance,
    createObserver,
    createStore: function <T>() {
      return this.createStateManager({
        id: "STORE_OBSERVER",
        state: new Map<string, T>(),
        mutations(state) {
          return {
            createEntity<P extends { id: string }>(props: P, entity: () => T) {
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
    },
    createEntity,
  };
})();
