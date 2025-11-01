// import { createObserver } from "../../observer";
// import {
//   WIZARD_OBSERVER_SCOPE,
//   type IWizardConfig,
//   type WizardPublicEventsType,
// } from "../../types";
// import { createCommands } from "./createCommands";
// import { createNavigationManager } from "./createNavigationManager";
// import { createMount } from "./createMount";
// import { createStateManager } from "./StateManager/createStateManager";

// const createEntity = (
//   props: IWizardConfig,
//   storeObserver: ReturnType<typeof createObserver>,
//   entitiesMap: Map<string, any>
// ) => {
//   const observer = createObserver(WIZARD_OBSERVER_SCOPE);
//   const stateManager = createStateManager(props);
//   const navigationManager = createNavigationManager(stateManager, observer);
//   const commands = createCommands(stateManager, navigationManager, observer);
//   const mount = createMount(entitiesMap, props, storeObserver);
//   return {
//     stateManager,
//     commands,
//     navigationManager,
//     addEventListener: (
//       event: `${WizardPublicEventsType}`,
//       callback: (payload: any) => void
//     ) => {
//       return observer.subscribe(event, ({ payload }) => {
//         callback(payload);
//       });
//     },
//     getClient() {
//       return {
//         addEventListener: this.addEventListener,
//         commands: this.commands,
//         getters: this.stateManager.getters,
//       };
//     },
//     subscribeInternal: observer.subscribe,
//     mount,
//   };
// };

// export { createEntity };

import { type IWizardConfig } from "../../types";
import { createWizardModules } from "./createWizardModules";
import { createWizardState } from "./createWizardState";
const createEntity = (props: IWizardConfig) => {
  const stateManager = createWizardState(props);
  const modules = createWizardModules(stateManager);
  return {
    stateManager,
    modules,
  };
};

export { createEntity };
