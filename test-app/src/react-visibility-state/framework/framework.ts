import { createScopedObserver } from "@scoped-observer/core";
import {
  ENTITY_OBSERVER,
  INITIAL_STATE,
  STORE_OBSERVER,
  VisibilityPublicEvents,
  type IEntity,
  type initialStateType,
  type VisibilityProps,
  type VisibilityPublicEventsType,
} from "../types";

type ModuleFactory<S, T> = (state: S) => T;
type ModuleMap<S> = Record<string, ModuleFactory<S, any>>;

export const framework = (() => {
  return {
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
      return {
        state: props.state,
        mutations: props.mutations(props.state),
        getters: props.getters(props.state),
      };
    },
    createModuleInstance: function <S, M extends ModuleMap<S>>(
      state: S,
      modules: M
    ) {
      type Built = { [K in keyof M]: ReturnType<M[K]> };

      const built = {} as Built;
      (Object.keys(modules) as Array<keyof M>).forEach((key) => {
        built[key] = modules[key](state);
      });

      return built;
    },
    createObserver(scope: string) {
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
    },
    createStore: function <T>() {
      return this.createStateManager({
        id: STORE_OBSERVER,
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
  };
})();

export const frameworkAPI = (() => {
  return {
    storeComposition: (() => {
      return {
        store: framework.createStore<IEntity>(),
        observer: framework.createObserver(STORE_OBSERVER),
      };
    })(),
    createEntityApiClient: function (props: VisibilityProps) {
      const stateManager = framework.createStateManager({
        id: props.id,
        state: {
          visibility: props.initState,
        },
        mutations(state) {
          return {
            setVisibility: (visibility: initialStateType) => {
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
      const observer = framework.createObserver(ENTITY_OBSERVER);
      function dispatchVisibilityChange(value: initialStateType) {
        observer.dispatch(VisibilityPublicEvents.ON_VISIBILITY_CHANGE, {
          payload: {
            visibility: value,
          },
        });
      }
      const modules = framework.createModuleInstance(
        {
          stateManager,
          observer,
        },
        {
          commands(value) {
            const { stateManager } = value;
            return {
              on: () => {
                stateManager.mutations.setVisibility(INITIAL_STATE.ON);
                dispatchVisibilityChange(INITIAL_STATE.ON);
              },
              off: () => {
                stateManager.mutations.setVisibility(INITIAL_STATE.OFF);
                dispatchVisibilityChange(INITIAL_STATE.OFF);
              },
              toggle: () => {
                const value =
                  stateManager.getters.getVisibility() === INITIAL_STATE.ON
                    ? INITIAL_STATE.OFF
                    : INITIAL_STATE.ON;
                stateManager.mutations.setVisibility(value);
                dispatchVisibilityChange(value);
              },
            };
          },
        }
      );
      return framework.createModuleInstance(
        {
          stateManager,
          modules,
          observer,
        },
        {
          api(value) {
            const state = value.stateManager;
            const getters = state.getters;
            const commands = value.modules.commands;
            const addEventListener = (
              event: `${VisibilityPublicEventsType}`,
              callback: () => void
            ) => {
              return value.observer.subscribe(event, () => {
                callback();
              });
            };

            return {
              getCommands: () => value.modules.commands,
              getters: () => value.stateManager.getters,
              addEventListener,
              getClient: () => {
                return {
                  visibility: getters.getVisibility(),
                };
              },
              getClientEntity: () => {
                return {
                  addEventListener,
                  commands,
                  getters,
                };
              },
            };
          },
        }
      );
    },
  };
})();
