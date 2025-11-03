import { createWizardState } from "./createWizardState";
import { createWizardModules } from "./createWizardModules";
import type { IWizardConfig } from "../../types";
import { createModuleInstance } from "../../core/createModuleInstance";

const createEntityApiClient = (props: IWizardConfig) => {
  const stateManager = createWizardState(props);
  const modules = createWizardModules(stateManager);
  const obj = {
    stateManager,
    modules,
  };

  return createModuleInstance(obj, {
    api(value) {
      const state = value.stateManager;
      const getters = state.getters;
      const commands = value.modules.commands;
      const addEventListener = value.modules.addEventListener;
      return {
        getMutations: () => value.stateManager.mutations,
        getGetters: () => value.stateManager.getters,
        getCommands: () => value.modules.commands,
        getAddEventListener: () => value.modules.addEventListener,
        getSubscribeInternal: () => state.observer.subscribe,
        getClientEntity: () => {
          return {
            addEventListener,
            commands,
            getters,
          };
        },
        getClient: () => {
          return {
            activeStep: state.getters.getActiveStep(),
            nextStep: state.getters.getNextStep(),
            previousStep: state.getters.getPreviousStep(),
            isLast: state.getters.isLast(),
            isFirst: state.getters.isFirst(),
            steps: state.getters.getSteps(),
            wizardId: state.getters.getWizardId(),
          };
        },
      };
    },
  });
};

export { createEntityApiClient };
