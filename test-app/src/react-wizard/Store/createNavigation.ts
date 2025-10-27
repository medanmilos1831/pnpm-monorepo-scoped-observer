import { createObserver } from "../observer";
import {
  wizardCommands,
  stepMiddlewares,
  WizardPublicEvents,
  type IWizardStep,
  type navigationCacheType,
  type wizardCommandsType,
} from "../types";
import { createGetters } from "./createGetters";
import { createMutations } from "./createMutations";

const createNavigation = (
  getters: ReturnType<typeof createGetters>,
  mutations: ReturnType<typeof createMutations>,
  observer: ReturnType<typeof createObserver>
) => {
  let stepMiddleware: IWizardStep | undefined;
  return {
    action: (navigationCache: navigationCacheType) => {
      if (navigationCache.stepName) {
        mutations.setActiveStep(navigationCache.stepName);
        observer.dispatch(WizardPublicEvents.ON_STEP_CHANGE);
        stepMiddleware = undefined;
      } else {
        if (navigationCache.command === wizardCommands.PREVIOUS) {
          return;
        }
        if (
          !navigationCache.stepName &&
          navigationCache.command === wizardCommands.NEXT
        ) {
          observer.dispatch(WizardPublicEvents.ON_FINISH);
          return;
        }
      }
    },
    middleware(navigationCache: navigationCacheType) {
      if (!stepMiddleware) return;
      if (stepMiddleware[navigationCache.clientProp]) {
        stepMiddleware[navigationCache.clientProp]!(
          this.createMiddlewareParams(navigationCache)
        );
      }
    },
    createMiddlewareParams(navigationCache: navigationCacheType) {
      return {
        activeStep: getters.getActiveStep(),
        toStep: navigationCache.stepName!,
      };
    },
    execute(navigationCache: navigationCacheType) {
      if (stepMiddleware && stepMiddleware.validate) {
        stepMiddleware.validate({
          payload: navigationCache.payload,
          command: navigationCache.command,
          activeStep: getters.getActiveStep(),
          toStep: navigationCache.stepName!,
          resolve: () => {
            this.middleware(navigationCache);
            this.action(navigationCache);
          },
        });
        return;
      }
      this.middleware(navigationCache);
      this.action(navigationCache);
    },
    navigate(obj: {
      command: wizardCommandsType;
      stepName?: string;
      payload?: any;
    }) {
      if (obj.command === wizardCommands.GO_TO_STEP && !obj.stepName) {
        return;
      }
      if (
        obj.command === wizardCommands.GO_TO_STEP &&
        obj.stepName === getters.getActiveStep()
      ) {
        return;
      }
      let command = obj.command as wizardCommandsType;
      let stepName: string | null = obj.stepName ?? null;
      let payload = obj.payload;
      if (
        command === wizardCommands.NEXT ||
        command === wizardCommands.PREVIOUS
      ) {
        stepName = getters.getStepByCommand({ command });
      }
      let data = {
        command,
        stepName,
        payload,
        clientProp: (() => {
          if (command === wizardCommands.NEXT) {
            return stepMiddlewares.ON_NEXT;
          }
          if (command === wizardCommands.PREVIOUS) {
            return stepMiddlewares.ON_PREVIOUS;
          }
          const steps = getters.getSteps();
          const currentStepIndex = steps.indexOf(getters.getActiveStep());
          const targetStepIndex = steps.indexOf(stepName!);
          return targetStepIndex > currentStepIndex
            ? stepMiddlewares.ON_NEXT
            : stepMiddlewares.ON_PREVIOUS;
        })(),
      };
      if (!data.stepName && command === wizardCommands.PREVIOUS) {
        return;
      }
      this.execute(data);
    },
    setStepMiddleware(props: IWizardStep) {
      stepMiddleware = props;
    },
  };
};

export { createNavigation };
