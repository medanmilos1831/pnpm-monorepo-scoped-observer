import { createModuleInstance } from "../../core/createModuleInstance";
import type { createWizardModules } from "./createWizardModules";
import type { createWizardState } from "./createWizardState";

const createEntityApiClient = (entity: {
  stateManager: ReturnType<typeof createWizardState>;
  modules: ReturnType<typeof createWizardModules>;
}) => {
  return createModuleInstance(entity, {
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
