import { createObserver } from "../observer";
import { commandType, type IWizardStep } from "../types";
import { createGetters } from "./createGetters";
import { createMutations } from "./createMutations";

const createNavigation = (
  getters: ReturnType<typeof createGetters>,
  mutations: ReturnType<typeof createMutations>,
  observer: ReturnType<typeof createObserver>
) => {
  let stepMiddleware: IWizardStep | undefined;
  let navigationCache: {
    command: commandType;
    stepName: string | null;
    payload: any;
    clientProp: "onNext" | "onPrevious";
  };

  return {
    action: () => {
      if (navigationCache.stepName) {
        mutations.setActiveStep(navigationCache.stepName);
        observer.dispatch("onStepChange");
        stepMiddleware = undefined;
      } else {
        if (navigationCache.command === commandType.PREVIOUS) {
          return;
        }
        if (
          !navigationCache.stepName &&
          navigationCache.command === commandType.NEXT
        ) {
          observer.dispatch("onFinish");
          return;
        }
      }
    },
    middleware() {
      if (!stepMiddleware) return;
      if (stepMiddleware[navigationCache.clientProp]) {
        stepMiddleware[navigationCache.clientProp]!(this.middlewareParams());
      }
    },
    middlewareParams() {
      return {
        activeStep: getters.getActiveStep(),
        toStep: navigationCache.stepName!,
        updateSteps: (callback: (steps: string[]) => string[]) => {
          mutations.updateSteps([...new Set(callback(getters.getSteps()))]);
          navigationCache.stepName = getters.getStepByCommand({
            command: navigationCache.command,
          });
        },
      };
    },
    prosed() {
      if (stepMiddleware && stepMiddleware.validate) {
        stepMiddleware.validate({
          payload: navigationCache.payload,
          command: navigationCache.command,
          activeStep: getters.getActiveStep(),
          toStep: navigationCache.stepName!,
          resolve: () => {
            this.middleware();
            this.action();
          },
        });
        return;
      }
      this.middleware();
      this.action();
    },
    navigate(obj: {
      command: `${commandType}`;
      stepName?: string;
      payload?: any;
    }) {
      if (obj.command === commandType.GO_TO_STEP && !obj.stepName) {
        return;
      }
      if (
        obj.command === commandType.GO_TO_STEP &&
        obj.stepName === getters.getActiveStep()
      ) {
        return;
      }
      let command = obj.command as commandType;
      let stepName: string | null = obj.stepName ?? null;
      let payload = obj.payload;
      if (command === commandType.NEXT || command === commandType.PREVIOUS) {
        stepName = getters.getStepByCommand({ command });
      }
      let data = {
        command,
        stepName,
        payload,
        clientProp: (() => {
          if (command === commandType.NEXT) {
            return "onNext" as const;
          }
          if (command === commandType.PREVIOUS) {
            return "onPrevious" as const;
          }
          const steps = getters.getSteps();
          const currentStepIndex = steps.indexOf(getters.getActiveStep());
          const targetStepIndex = steps.indexOf(stepName!);
          return targetStepIndex > currentStepIndex ? "onNext" : "onPrevious";
        })(),
      };
      if (!data.stepName && command === commandType.PREVIOUS) {
        return;
      }
      navigationCache = data;
      this.prosed();
    },
    setStepMiddleware(props: IWizardStep) {
      stepMiddleware = props;
    },
  };
};

export { createNavigation };
