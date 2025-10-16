import { Observer } from "./Observer";
import { WizardModule } from "./WizardModule";
import { StepModule } from "./StepModule";
import { WizardCommands, WizardEvents, WizardInternalEvents } from "./types";
import { onNextMiddleware, onPreviousMiddleware } from "./middleware";

export function createClient({
  wizard,
  step,
}: {
  wizard: WizardModule;
  step: StepModule;
}) {
  const observer = new Observer();

  function resolve(
    toStep: string,
    command: WizardCommands.NEXT | WizardCommands.PREVIOUS
  ) {
    if (command === WizardCommands.NEXT && step.middlewareOnNext) {
      onNextMiddleware(observer, wizard);
    }
    if (command === WizardCommands.PREVIOUS && step.middlewareOnPrevious) {
      onPreviousMiddleware(observer, wizard);
    }

    observer.dispatch(
      command === WizardCommands.NEXT
        ? WizardEvents.ON_NEXT
        : WizardEvents.ON_PREVIOUS,
      {
        activeStep: wizard.activeStep,
        toStep,
      }
    );
    wizard.changeStep(toStep);
    observer.dispatch(WizardEvents.ON_STEP_CHANGE);
  }

  function handleValidation(
    command: WizardCommands,
    result: string,
    obj?: any
  ) {
    if (step.hasValidation) {
      observer.dispatch(WizardInternalEvents.ON_VALIDATE, {
        command,
        activeStep: wizard.activeStep,
        toStep: result,
        resolve: () => {
          resolve(result, command);
        },
        ...obj,
      });
      return true;
    }
    return false;
  }

  function goToStep(
    stepName: string,
    obj?: { actionType?: string },
    command?: WizardCommands
  ) {
    if (stepName === wizard.activeStep) {
      return;
    }
    let validationCommand = command;
    if (!validationCommand) {
      const currentStepIndex = wizard.steps.indexOf(wizard.activeStep);
      const targetStepIndex = wizard.steps.indexOf(stepName);

      validationCommand =
        targetStepIndex > currentStepIndex
          ? WizardCommands.NEXT
          : WizardCommands.PREVIOUS;
    }
    if (handleValidation(validationCommand, stepName, obj)) {
      return;
    }
    resolve(stepName, validationCommand);
  }

  return {
    next(obj?: { actionType?: string }) {
      const result = wizard.findStep({ command: WizardCommands.NEXT })!;
      if (!result) {
        observer.dispatch(WizardEvents.ON_FINISH);
        return;
      }
      goToStep(result, obj, WizardCommands.NEXT);
    },
    previous: (obj?: { actionType?: string }) => {
      const result = wizard.findStep({ command: WizardCommands.PREVIOUS });
      if (!result) return;
      if (handleValidation(WizardCommands.PREVIOUS, result, obj)) {
        return;
      }
      goToStep(result, obj, WizardCommands.PREVIOUS);
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
    goToStep,
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
