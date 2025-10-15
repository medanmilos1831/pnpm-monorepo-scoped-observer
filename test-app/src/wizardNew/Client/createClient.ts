import { Observer } from "../Observer";
import type { IOnMiddlewareNextPreviousParams } from "../react-intergation/types";
import { WizardInternalEvents, WizardCommands, WizardEvents } from "../types";
import type { Step, Wizard } from "../Wizard";
import { createEventName } from "../utils";

export function createClient({ wizard, step }: { wizard: Wizard; step: Step }) {
  const observer = new Observer();
  function resolve(
    toStep: string,
    command: WizardCommands.NEXT | WizardCommands.PREVIOUS
  ) {
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

  return {
    next: (obj?: { actionType?: string }) => {
      if (step.middlewareOnNext) {
        observer.dispatch(WizardInternalEvents.ON_MIDDLEWARE_NEXT, {
          updateSteps: (callback: (steps: string[]) => string[]) => {
            const updatedSteps = callback(wizard.steps);
            wizard.steps = [...new Set(updatedSteps)];
          },
        });
      }
      const result = wizard.findStep({ command: WizardCommands.NEXT })!;
      if (!result) {
        observer.dispatch(WizardEvents.ON_FINISH);
        return;
      }
      if (handleValidation(WizardCommands.NEXT, result, obj)) {
        return;
      }
      resolve(result, WizardCommands.NEXT);
    },
    previous: (obj?: {
      actionType?: string;
      middleware?: (params: IOnMiddlewareNextPreviousParams) => void;
    }) => {
      if (step.middlewareOnPrevious) {
        observer.dispatch(WizardInternalEvents.ON_MIDDLEWARE_PREVIOUS, {
          updateSteps: (callback: (steps: string[]) => string[]) => {
            const updatedSteps = callback(wizard.steps);
            wizard.steps = [...new Set(updatedSteps)];
          },
        });
      }
      const result = wizard.findStep({ command: WizardCommands.PREVIOUS });
      if (!result) return;
      if (handleValidation(WizardCommands.PREVIOUS, result, obj)) {
        return;
      }
      resolve(result, WizardCommands.PREVIOUS);
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
    goToStep: (step: string) => {
      const currentStepIndex = wizard.steps.indexOf(wizard.activeStep);
      const targetStepIndex = wizard.steps.indexOf(step);

      const command =
        targetStepIndex > currentStepIndex
          ? WizardCommands.NEXT
          : WizardCommands.PREVIOUS;
      resolve(step, command);
    },
    subscribe: (eventName: string, callback: (payload: any) => void) => {
      return observer.subscribe(eventName, callback);
    },
  };
}
