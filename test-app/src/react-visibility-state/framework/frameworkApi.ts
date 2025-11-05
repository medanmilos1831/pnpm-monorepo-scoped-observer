import { frameworkBase } from "./base";
import {
  INITIAL_STATE,
  VisibilityPublicEvents,
  type initialStateType,
  type VisibilityProps,
} from "../types";
export const frameworkApi = (() => {
  const store =
    frameworkBase.createStore<ReturnType<typeof createEntityApiClient>>();
  function createEntityApiClient(props: VisibilityProps) {
    const entityStateManager = frameworkBase.createStateManager({
      id: props.id,
      state: {
        visibility: props.initState,
      },
      mutations(state) {
        return {
          setVisibility: (visibility) => {
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
    const entityObserver = frameworkBase.createObserver("ENTITY_OBSERVER");
    const entityModules = frameworkBase.createModuleInstance(
      {
        stateManager: entityStateManager,
        observer: entityObserver,
      },
      {
        commands(value) {
          const { stateManager, observer } = value;
          function dispatchVisibilityChange(value: initialStateType) {
            observer.dispatch(VisibilityPublicEvents.ON_VISIBILITY_CHANGE, {
              payload: {
                visibility: value,
              },
            });
          }
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
        onLoad(value) {
          return {
            setInitialState: (state: initialStateType) => {
              value.stateManager.mutations.setVisibility(state);
            },
          };
        },
      }
    );

    const entityApi = frameworkBase.createModuleInstance(
      {
        stateManager: entityStateManager,
        observer: entityObserver,
        modules: entityModules,
      },
      {
        api(value) {
          return {
            getCommands: () => value.modules.commands,
            getVisibility: () => value.stateManager.getters.getVisibility(),
            getClient: () => {
              return {
                visibility: value.stateManager.getters.getVisibility(),
              };
            },
            watchVisibilityChange: {
              subscribe: (notify: () => void) => {
                return value.observer.subscribe(
                  VisibilityPublicEvents.ON_VISIBILITY_CHANGE,
                  () => {
                    notify();
                  }
                );
              },
              snapshot: () => {
                return value.stateManager.getters.getVisibility();
              },
              getValue() {
                return value.stateManager.getters.getVisibility();
              },
            },
          };
        },
      }
    );
    return entityApi;
  }

  return {
    createEntityApiClient: (props: VisibilityProps) => {
      store.mutations.createEntity({ id: props.id }, () => {
        return createEntityApiClient(props);
      });
      return store.getters.getEntityById("test").api;
    },
    getEntityApiClientById: (id: string) => {
      return store.getters.getEntityById(id).api;
    },
  };
})();
