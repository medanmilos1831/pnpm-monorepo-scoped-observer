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
        toStep: state.__INTERNAL__ACTIVE_STEP,
        payload: undefined,
        isReset: true,
        middleware: null,
      });
    },
    next: (payload?: any) => {
      navigation.navigate({
        command: wizardCommands.NEXT,
        toStep: getters.getStepByCommand({
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
        toStep:
          getters.getStepByCommand({ command: wizardCommands.PREVIOUS }) ??
          null,
        payload,
        isReset: false,
        middleware: stepMiddlewares.ON_PREVIOUS,
      });
    },
    goToStep: (toStep: string, payload?: any) => {
      const steps = getters.getSteps();
      const currentStepIndex = steps.indexOf(getters.getActiveStep());
      const targetStepIndex = steps.indexOf(toStep);

      navigation.navigate({
        command: wizardCommands.GO_TO_STEP,
        toStep,
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
