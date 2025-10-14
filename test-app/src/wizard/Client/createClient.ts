import type { Observer } from "../Observer";
import { IWizardInternalEvents, WizardCommands, WizardEvents } from "../types";
import type { Step, Wizard } from "../Wizard";
import { createEventName } from "../utils";

export function createClient(observer: Observer) {
  return ({ wizard, step }: { wizard: Wizard; step: Step }) => {
    function resolve(
      toStep: string,
      command: WizardCommands.NEXT | WizardCommands.PREVIOUS
    ) {
      observer.dispatch(
        command === WizardCommands.NEXT
          ? createEventName(wizard.id, WizardEvents.ON_NEXT)
          : createEventName(wizard.id, WizardEvents.ON_PREVIOUS),
        {
          activeStep: wizard.activeStep,
          toStep,
        }
      );
      wizard.changeStep(toStep);
      observer.dispatch(
        createEventName(wizard.id, WizardEvents.ON_STEP_CHANGE)
      );
    }

    function handleValidation(
      command: WizardCommands,
      result: string,
      obj?: any
    ) {
      if (step.hasValidation) {
        observer.dispatch(
          createEventName(wizard.id, IWizardInternalEvents.ON_VALIDATE),
          {
            command,
            activeStep: wizard.activeStep,
            toStep: result,
            resolve: () => {
              resolve(result, command);
            },
            ...obj,
          }
        );
        return true;
      }
      return false;
    }

    return {
      next: (obj?: { actionType?: string }) => {
        if (step.middlewareOnNext) {
          observer.dispatch(
            createEventName(
              wizard.id,
              IWizardInternalEvents.ON_MIDDLEWARE_NEXT
            ),
            {
              updateSteps: (callback: (steps: string[]) => string[]) => {
                const updatedSteps = callback(wizard.steps);
                wizard.steps = [...new Set(updatedSteps)];
              },
            }
          );
        }
        const result = wizard.findStep({ command: WizardCommands.NEXT })!;
        if (!result) {
          observer.dispatch(createEventName(wizard.id, WizardEvents.ON_FINISH));
          return;
        }
        if (handleValidation(WizardCommands.NEXT, result, obj)) {
          return;
        }
        resolve(result, WizardCommands.NEXT);
      },
      previous: (obj?: {
        actionType?: string;
        middleware?: (params: any) => void;
      }) => {
        if (step.middlewareOnPrevious) {
          observer.dispatch(
            createEventName(
              wizard.id,
              IWizardInternalEvents.ON_MIDDLEWARE_PREVIOUS
            ),
            {
              updateSteps: (callback: (steps: string[]) => string[]) => {
                const updatedSteps = callback(wizard.steps);
                wizard.steps = [...new Set(updatedSteps)];
              },
            }
          );
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
        observer.dispatch(createEventName(wizard.id, WizardEvents.ON_RESET));
        observer.dispatch(
          createEventName(wizard.id, WizardEvents.ON_STEP_CHANGE)
        );
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
        
        if (targetStepIndex === -1) {
          console.warn(`Step "${step}" not found in wizard steps`);
          return;
        }
        
        if (currentStepIndex === targetStepIndex) {
          console.warn(`Already on step "${step}"`);
          return;
        }
        
        // Return 'next' if target is after current, 'previous' if before
        return targetStepIndex > currentStepIndex ? 'next' : 'previous';
      },
      subscribe: (eventName: string, callback: (payload: any) => void) => {
        return observer.subscribe(eventName, callback);
      },
    };
  };
}
