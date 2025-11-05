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
import { frameworkBase } from "./base";

export const frameworkAPI = (() => {
  const store = frameworkBase.createStore<IEntity>();
  const storeObserver = frameworkBase.createObserver(STORE_OBSERVER);
  return {
    getStore: () => store,
    getStoreObserver: () => storeObserver,
    createEntityApiClient: function (props: VisibilityProps) {
      const stateManager = frameworkBase.createStateManager({
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
      const observer = frameworkBase.createObserver(ENTITY_OBSERVER);
      function dispatchVisibilityChange(value: initialStateType) {
        observer.dispatch(VisibilityPublicEvents.ON_VISIBILITY_CHANGE, {
          payload: {
            visibility: value,
          },
        });
      }
      const modules = frameworkBase.createModuleInstance(
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
      const entity = frameworkBase.createModuleInstance(
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
              return observer.subscribe(event, () => {
                callback();
              });
            };

            return {
              scope: observer.scope,
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
      store.mutations.createEntity({ id: props.id }, () => {
        return entity;
      });
      return store.getters.getEntity(props.id)!;
    },
  };
})();
