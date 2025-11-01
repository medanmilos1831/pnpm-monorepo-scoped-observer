import { createModuleInstance } from "../../core/createModuleInstance";
import {
  stepMiddlewares,
  wizardCommands,
  WizardInternalEvents,
  WizardPublicEvents,
  type IWizardStep,
  type navigateParamsType,
  type stepMiddlewaresType,
  type wizardCommandsType,
  type WizardPublicEventsType,
} from "../../types";
import type { createWizardState } from "./createWizardState";

const createWizardModules = (state: ReturnType<typeof createWizardState>) => {
  let stepMiddleware: IWizardStep | undefined;
  let locked = false;
  return createModuleInstance(state, {
    addEventListener(state) {
      return (
        event: `${WizardPublicEventsType}`,
        callback: (payload: any) => void
      ) => {
        return state.observer.subscribe(event, ({ payload }) => {
          callback(payload);
        });
      };
    },
    navigationManager(state) {
      return {
        navigate({
          command,
          toStep,
          isReset,
          payload,
          middleware,
        }: navigateParamsType) {
          // Handle reset command - directly apply transition without middleware
          if (isReset) {
            this.applyTransition({
              toStep,
              isReset: true,
              command,
            });
            return;
          }
          // Prevent navigation to same step
          if (
            command === wizardCommands.GO_TO_STEP &&
            toStep === state.getters.getActiveStep()
          ) {
            return;
          }
          // Prevent previous navigation when no previous step exists
          if (!toStep && command === wizardCommands.PREVIOUS) {
            return;
          }
          // Execute navigation with lock protection
          this.withLock(() =>
            this.execute({ command, toStep, isReset, payload, middleware })
          );
        },
        applyTransition: ({
          toStep,
          isReset,
          command,
        }: {
          toStep: string | null;
          isReset: boolean;
          command: wizardCommandsType;
        }) => {
          if (toStep) {
            let activeStep = state.getters.getActiveStep();
            state.mutations.changeStep(toStep);
            if (isReset) {
              state.mutations.reset();
              state.observer.dispatch(WizardPublicEvents.ON_RESET);
            }
            stepMiddleware = undefined;
            state.observer.dispatch(WizardPublicEvents.ON_STEP_CHANGE, {
              to: toStep,
              from: activeStep,
              command,
            });
            return;
          }
          state.observer.dispatch(WizardPublicEvents.ON_FINISH);
        },
        execute(params: navigateParamsType) {
          const obj = {
            middleware: params.middleware as stepMiddlewaresType,
            toStep: params.toStep as string,
            isReset: params.isReset,
            command: params.command,
          };
          // Check if current step has validation middleware
          if (stepMiddleware && stepMiddleware.validate) {
            // Call step's validate function with resolve callback
            stepMiddleware!.validate!({
              payload: params.payload,
              command: params.command,
              activeStep: state.getters.getActiveStep(),
              toStep: params.toStep!,
              resolve: () => {
                // Validation passed - proceed with navigation
                this.resolve(obj);
              },
            });
            return;
          }
          // No validation required - proceed directly with navigation
          this.resolve(obj);
        },
        resolve({
          middleware,
          toStep,
          isReset,
          command,
        }: {
          middleware: stepMiddlewaresType;
          toStep: navigateParamsType["toStep"];
          isReset: boolean;
          command: wizardCommandsType;
        }) {
          if (stepMiddleware && stepMiddleware[middleware]) {
            stepMiddleware[middleware]!({
              from: state.getters.getActiveStep(),
              to: toStep as string,
            });
          }
          this.applyTransition({
            toStep,
            isReset,
            command,
          });
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
    },
    commands(state) {
      return {
        reset: () => {
          this.navigationManager(state).navigate({
            command: wizardCommands.GO_TO_STEP,
            toStep: state.state.__INTERNAL__ACTIVE_STEP,
            payload: undefined,
            isReset: true,
            middleware: null,
          });
        },
        next: (payload?: any) => {
          this.navigationManager(state).navigate({
            command: wizardCommands.NEXT,
            toStep: state.getters.getStepByCommand({
              command: wizardCommands.NEXT,
            }),
            payload,
            isReset: false,
            middleware: stepMiddlewares.ON_NEXT,
          });
        },
        previous: (payload?: any) => {
          this.navigationManager(state).navigate({
            command: wizardCommands.PREVIOUS,
            toStep:
              state.getters.getStepByCommand({
                command: wizardCommands.PREVIOUS,
              }) ?? null,
            payload,
            isReset: false,
            middleware: stepMiddlewares.ON_PREVIOUS,
          });
        },
        goToStep: (toStep: string, payload?: any) => {
          const steps = state.getters.getSteps();
          const currentStepIndex = steps.indexOf(state.getters.getActiveStep());
          const targetStepIndex = steps.indexOf(toStep);

          this.navigationManager(state).navigate({
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
          if (this.navigationManager(state).isLocked()) {
            return;
          }
          state.mutations.updateSteps(callback);
          state.observer.dispatch(WizardInternalEvents.ON_STEPS_UPDATE);
        },
      };
    },
    clientApi(state) {
      return () => {
        return {
          client: {
            activeStep: state.getters.getActiveStep(),
            nextStep: state.getters.getNextStep(),
            previousStep: state.getters.getPreviousStep(),
            isLast: state.getters.isLast(),
            isFirst: state.getters.isFirst(),
            steps: state.getters.getSteps(),
            wizardId: state.getters.getWizardId(),
          },
          clientEntity: {
            addEventListener: this.addEventListener,
            commands: this.commands,
            getters: state.getters,
          },
          subscribeInternal: state.observer.subscribe,
        };
      };
    },
  });
};

export { createWizardModules };
