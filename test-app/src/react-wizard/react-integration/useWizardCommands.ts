import { stepMiddlewares, wizardCommands, type IEntity } from "../types";

const useWizardCommands = (entity: IEntity) => {
  const state = entity.state;
  const mutations = entity.mutations;
  const getters = entity.getters;
  const navigation = entity.navigation;
  return {
    reset: () => {
      navigation.navigate({
        command: wizardCommands.GO_TO_STEP,
        stepName: state.__INTERNAL__ACTIVE_STEP,
        payload: undefined,
        isReset: true,
        middleware: null,
      });
    },
    next: (payload?: any) => {
      navigation.navigate({
        command: wizardCommands.NEXT,
        stepName: getters.getStepByCommand({
          command: wizardCommands.NEXT,
        }),
        payload,
        isReset: false,
        middleware: stepMiddlewares.ON_NEXT,
      });
    },
    previous: (payload?: any) => {
      navigation.navigate({
        command: wizardCommands.PREVIOUS,
        stepName:
          getters.getStepByCommand({ command: wizardCommands.PREVIOUS }) ??
          null,
        payload,
        isReset: false,
        middleware: stepMiddlewares.ON_PREVIOUS,
      });
    },
    goToStep: (stepName: string, payload?: any) => {
      const steps = getters.getSteps();
      const currentStepIndex = steps.indexOf(getters.getActiveStep());
      const targetStepIndex = steps.indexOf(stepName);
      navigation.navigate({
        command: wizardCommands.GO_TO_STEP,
        stepName,
        payload,
        isReset: false,
        middleware:
          targetStepIndex > currentStepIndex
            ? stepMiddlewares.ON_NEXT
            : stepMiddlewares.ON_PREVIOUS,
      });
    },
    updateSteps: (callback: (steps: string[]) => string[]) => {
      if (navigation.isLocked()) {
        console.warn("Navigation is locked");
        return;
      }
      mutations.updateSteps(callback);
    },
  };
};

export { useWizardCommands };
