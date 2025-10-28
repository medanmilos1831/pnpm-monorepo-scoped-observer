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
  let locked = false;
  return {
    makeTransition: (navigationCache: navigationCacheType) => {
      if (navigationCache.stepName) {
        mutations.changeStep(navigationCache.stepName!);
        if (navigationCache.isReset) {
          mutations.reset();
          observer.dispatch(WizardPublicEvents.ON_RESET);
        }
        observer.dispatch(WizardPublicEvents.ON_STEP_CHANGE);
        stepMiddleware = undefined;
        return;
      }
      observer.dispatch(WizardPublicEvents.ON_FINISH);
    },
    middleware(navigationCache: navigationCacheType) {
      if (!stepMiddleware) return;
      if (stepMiddleware[navigationCache.middleware]) {
        stepMiddleware[navigationCache.middleware]!({
          activeStep: getters.getActiveStep(),
          toStep: navigationCache.stepName!,
        });
      }
    },
    resolve(navigationCache: navigationCacheType) {
      this.middleware(navigationCache);
      this.makeTransition(navigationCache);
    },
    execute(navigationCache: navigationCacheType) {
      if (stepMiddleware && stepMiddleware.validate) {
        stepMiddleware!.validate!({
          payload: navigationCache.payload,
          command: navigationCache.command,
          activeStep: getters.getActiveStep(),
          toStep: navigationCache.stepName!,
          resolve: () => {
            this.resolve(navigationCache);
          },
        });
        return;
      }
      this.withLock(() => this.resolve(navigationCache));
    },
    navigate(obj: {
      command: wizardCommandsType;
      stepName?: string;
      payload?: any;
      isReset?: boolean;
    }) {
      let isReset = obj.isReset ?? false;
      if (isReset) {
        this.makeTransition({
          stepName: obj.stepName!,
          command: wizardCommands.GO_TO_STEP,
          middleware: stepMiddlewares.ON_PREVIOUS,
          payload: undefined,
          isReset: true,
        });
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
        middleware: (() => {
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
        isReset: false,
      };
      if (!data.stepName && command === wizardCommands.PREVIOUS) {
        return;
      }
      this.execute(data);
    },
    setStepMiddleware(props: IWizardStep) {
      stepMiddleware = props;
    },
    isLocked: () => {
      return locked;
    },
    withLock(callback: () => void) {
      if (locked) return;
      locked = true;
      callback();
      locked = false;
    },
  };
};

export { createNavigation };
