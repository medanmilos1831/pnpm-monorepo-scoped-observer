import { framework } from ".";
import {
  INITIAL_STATE,
  VisibilityPublicEvents,
  type VisibilityProps,
} from "../types";
import { commands } from "./commands";
import { createEntityStateManager } from "./createEntityStateManager";

// function pera(stateManager: ReturnType<typeof createEntityStateManager>) {
//   return framework.createModule(stateManager, (state) => {
//     return {
//       on() {
//         state.mutations.setVisibility(INITIAL_STATE.ON);
//       },
//     };
//   });
// }

export const frameworkApi = (() => {
  function createEntityApiClient(props: VisibilityProps) {
    framework.createStateManager({
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
    // const commandModule = framework.createModule(
    //   { entityStateManager },
    //   (value, context) => {
    //     const { entityStateManager: state } = value;
    //     return {
    //       on: () => {
    //         state.mutations.setVisibility(INITIAL_STATE.ON);
    //         // dispatchVisibilityChange(INITIAL_STATE.ON);
    //       },
    //       off: () => {
    //         state.mutations.setVisibility(INITIAL_STATE.OFF);
    //         // observer.dispatch(VisibilityPublicEvents.ON_VISIBILITY_CHANGE, {
    //         //   payload: {
    //         //     visibility: INITIAL_STATE.OFF,
    //         //   },
    //         // });
    //       },
    //       toggle: () => {
    //         const value =
    //           state.getters.getVisibility() === INITIAL_STATE.ON
    //             ? INITIAL_STATE.OFF
    //             : INITIAL_STATE.ON;
    //         state.mutations.setVisibility(value);
    //         // dispatchVisibilityChange(value);
    //       },
    //     };
    //   }
    // );

    const entityObserver = framework.createObserver("ENTITY_OBSERVER");
    // const entityModules = framework.createModuleInstance(
    //   {
    //     stateManager: entityStateManager,
    //     observer: entityObserver,
    //   },
    //   {
    //     commands,
    //   }
    // );

    // const entityApi = framework.createModuleInstance(
    //   {
    //     stateManager: entityStateManager,
    //     observer: entityObserver,
    //     modules: entityModules,
    //   },
    //   {
    //     api(value) {
    //       return {
    //         // getCommands: () => value.modules.commands,
    //         // getVisibility: () => value.stateManager.getters.getVisibility(),
    //         // getClient: () => {
    //         //   return {
    //         //     visibility: value.stateManager.getters.getVisibility(),
    //         //   };
    //         // },
    //         // watchVisibilityChange: {
    //         //   subscribe: (notify: () => void) => {
    //         //     return value.observer.subscribe(
    //         //       VisibilityPublicEvents.ON_VISIBILITY_CHANGE,
    //         //       () => {
    //         //         notify();
    //         //       }
    //         //     );
    //         //   },
    //         //   snapshot: () => {
    //         //     return value.stateManager.getters.getVisibility();
    //         //   },
    //         //   getValue() {
    //         //     return value.stateManager.getters.getVisibility();
    //         //   },
    //         // },
    //         // onMount: {
    //         //   subscribe: (notify: () => void) => {
    //         //     return observer.subscribe(
    //         //       `${VisibilityPublicEvents.ON_VISIBILITY_CHANGE}-${props.id}`,
    //         //       () => {
    //         //         notify();
    //         //       }
    //         //     );
    //         //   },
    //         //   snapshot: () => {
    //         //     return store.getters.hasEntity(props.id);
    //         //   },
    //         //   getValue: (id: string) => {
    //         //     return {
    //         //       visibility: store.getters
    //         //         .getEntityById(props.id)
    //         //         .api.getVisibility(),
    //         //       commands: store.getters
    //         //         .getEntityById(props.id)
    //         //         .api.getCommands(),
    //         //     };
    //         //   },
    //         // },
    //       };
    //     },
    //   }
    // );
    // return entityApi;
  }

  const entityStateManager = framework.createStateManager({
    id: "ENTITY_STATE_MANAGER",
    state: {
      visibility: INITIAL_STATE.OFF,
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

  entityStateManager.createModule((state) => {
    state;
    return {};
  });

  console.log("hehehhhe", entityStateManager);

  return {
    createEntityApiClient: createEntityApiClient,
    getEntityApiClientById: (id: string) => {
      // return store.getters.getEntityById(id).api;
    },
  };
})();
