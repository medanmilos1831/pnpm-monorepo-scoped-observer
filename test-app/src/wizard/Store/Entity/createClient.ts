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

  function resolve(
    toStep: string,
    command: WizardCommands.NEXT | WizardCommands.PREVIOUS
  ) {
    if (command === WizardCommands.NEXT && step.middlewareOnNext) {
      step.middlewareOnNext({
        updateSteps: (callback: (steps: string[]) => string[]) => {
          const updatedSteps = callback(wizard.steps);
          wizard.steps = [...new Set(updatedSteps)];
        },
      });
    }
    if (command === WizardCommands.PREVIOUS && step.middlewareOnPrevious) {
      step.middlewareOnPrevious({
        updateSteps: (callback: (steps: string[]) => string[]) => {
          const updatedSteps = callback(wizard.steps);
          wizard.steps = [...new Set(updatedSteps)];
        },
      });
    }

    if (command === WizardCommands.NEXT && step.onNext) {
      step.onNext({
        activeStep: wizard.activeStep,
        toStep,
      });
    }
    if (command === WizardCommands.PREVIOUS && step.onPrevious) {
      step.onPrevious({
        activeStep: wizard.activeStep,
        toStep,
      });
    }
    wizard.changeStep(toStep);
    observer.dispatch(WizardEvents.ON_STEP_CHANGE);
  }

  function handleValidation(
    command: WizardCommands,
    result: string,
    obj?: any
  ) {
    if (step.validate) {
      step.validate({
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
