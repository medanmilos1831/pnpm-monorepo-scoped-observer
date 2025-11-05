import { framework } from ".";
import {
  INITIAL_STATE,
  VisibilityPublicEvents,
  type initialStateType,
  type VisibilityProps,
} from "../types";
export const frameworkApi = (() => {
  const { store, observer } =
    framework.storeComposition<ReturnType<typeof createEntityApiClient>>();
  function createEntityApiClient(props: VisibilityProps) {
    const entityStateManager = framework.createStateManager({
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

    const entityObserver = framework.createObserver("ENTITY_OBSERVER");
    const entityModules = framework.createModuleInstance(
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

    const entityApi = framework.createModuleInstance(
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
            onMount: {
              subscribe: (notify: () => void) => {
                return observer.subscribe(
                  `${VisibilityPublicEvents.ON_VISIBILITY_CHANGE}-${props.id}`,
                  () => {
                    notify();
                  }
                );
              },
              snapshot: () => {
                return store.getters.hasEntity(props.id);
              },
              getValue: (id: string) => {
                return {
                  visibility: store.getters
                    .getEntityById(props.id)
                    .api.getVisibility(),
                  commands: store.getters
                    .getEntityById(props.id)
                    .api.getCommands(),
                };
              },
            },
          };
        },
      }
    );
    return entityApi;
  }

  return {
    createStore: () => {
      return framework.createStore<ReturnType<typeof createEntityApiClient>>();
    },
    createEntityApiClient: (props: VisibilityProps) => {
      store.mutations.createEntity({ id: props.id }, () => {
        return createEntityApiClient(props);
      });
      return store.getters.getEntityById("test").api;
    },
    getEntityApiClientById: (id: string) => {
      return store.getters.getEntityById(id).api;
    },
    // onMount: {
    //   subscribe: (notify: () => void) => {
    //     return observer.subscribe(
    //       `${VisibilityPublicEvents.ON_VISIBILITY_CHANGE}-${id}`,
    //       () => {
    //         notify();
    //       }
    //     );
    //   },
    //   snapshot: (id: string) => {
    //     return store.getters.getEntityById(id).api;
    //   },
    //   getValue: (id: string) => {
    //     return store.getters.getEntityById(id).api;
    //   },
    // },
    // getStoreComposition: () => {
    //   return {
    //     store,
    //     observer,
    //     onMount(){
    //       return (notify: () => void) => {
    //         return observer.subscribe(
    //           VisibilityPublicEvents.ON_VISIBILITY_CHANGE,
    //           () => {
    //             notify();
    //           }
    //         );
    //       };
    //     }
    //   };
    // },
  };
})();
