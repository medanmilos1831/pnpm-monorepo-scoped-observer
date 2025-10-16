import { Observer } from "./Observer";
import { StepModule } from "./StepModule";
import { WizardCommands, WizardEvents } from "./types";
import { WizardModule } from "./WizardModule";

export function createClient({
  wizard,
  step,
}: {
  wizard: WizardModule;
  step: StepModule;
}) {
  const observer = new Observer();

  function transition({ command }: { command: WizardCommands }) {
    let toStep = wizard.findStep({ command })!;
    return {
      toStep,
      middleware: () => {
        const prop =
          command === WizardCommands.NEXT
            ? "middlewareOnNext"
            : "middlewareOnPrevious";
        if (step[prop]) {
          step[prop]({
            updateSteps: (callback: (steps: string[]) => string[]) => {
              const updatedSteps = callback(wizard.steps);
              wizard.steps = [...new Set(updatedSteps)];
              toStep = wizard.findStep({ command })!;
            },
          });
        }
      },
      action: () => {
        if (!toStep) return;
        const prop = command === WizardCommands.NEXT ? "onNext" : "onPrevious";
        if (step[prop]) {
          step[prop]({
            activeStep: wizard.activeStep,
            toStep: wizard.findStep({ command })!,
          });
        }
      },
      changeStep: () => {
        if (toStep) {
          wizard.changeStep(toStep);
          observer.dispatch(WizardEvents.ON_STEP_CHANGE);
        } else {
          if (command === WizardCommands.PREVIOUS) {
            return;
          }
          observer.dispatch(WizardEvents.ON_FINISH);
        }
      },
    };
  }

  function validationHandler(
    command: WizardCommands,
    transitionPlan: ReturnType<typeof transition>,
    obj?: any
  ) {
    const { middleware, action, changeStep, toStep } = transitionPlan;
    if (step.validate) {
      step.validate({
        command,
        activeStep: wizard.activeStep,
        toStep: toStep,
        resolve: () => {
          middleware();
          action();
          changeStep();
        },
        ...obj,
      });
      return "validated";
    }
    return "no_validation";
  }
  function transitionWrapper(
    command: WizardCommands,
    obj?: { actionType?: string }
  ) {
    const transitionPlan = transition({
      command,
    });
    const validationResult = validationHandler(command, transitionPlan, obj);
    if (validationResult === "validated") {
      return;
    }
    const { middleware, action, changeStep } = transitionPlan;
    middleware();
    action();
    changeStep();
  }
  return {
    next(obj?: { actionType?: string }) {
      transitionWrapper(WizardCommands.NEXT, obj);
    },
    previous: (obj?: { actionType?: string }) => {
      transitionWrapper(WizardCommands.PREVIOUS, obj);
    },
    reset: () => {
      wizard.steps = [...wizard.__INTERNAL__STEPS];
      wizard.changeStep(wizard.__INTERNAL__ACTIVE_STEP);
      observer.dispatch(WizardEvents.ON_RESET);
      observer.dispatch(WizardEvents.ON_STEP_CHANGE);
    },
    getActiveStep: () => {
      return wizard.activeStep;
    },
    getSteps: () => {
      return wizard.steps;
    },
    getWizardId: () => {
      return wizard.id;
    },
    goToStep: (stepName: string, obj?: { actionType?: string }) => {
      if (stepName === wizard.activeStep) {
        return;
      }
      const currentStepIndex = wizard.steps.indexOf(wizard.activeStep);
      const targetStepIndex = wizard.steps.indexOf(stepName);

      const command =
        targetStepIndex > currentStepIndex
          ? WizardCommands.NEXT
          : WizardCommands.PREVIOUS;
      transitionWrapper(command, obj);
    },
    isLast: () => {
      return wizard.isLast;
    },
    isFirst: () => {
      return wizard.isFirst;
    },
    subscribe: (eventName: string, callback: (payload: any) => void) => {
      return observer.subscribe(eventName, callback);
    },
  };
}
