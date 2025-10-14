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
        if (step.hasValidation) {
          observer.dispatch(
            createEventName(wizard.id, IWizardInternalEvents.ON_VALIDATE),
            {
              command: WizardCommands.NEXT,
              activeStep: wizard.activeStep,
              toStep: result,
              resolve: () => {
                resolve(result, WizardCommands.NEXT);
              },
              ...obj,
            }
          );
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
        if (step.hasValidation) {
          observer.dispatch(
            createEventName(wizard.id, IWizardInternalEvents.ON_VALIDATE),
            {
              command: WizardCommands.PREVIOUS,
              activeStep: wizard.activeStep,
              toStep: result,
              resolve: () => {
                resolve(result, WizardCommands.PREVIOUS);
              },
              ...obj,
            }
          );
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
      subscribe: (eventName: string, callback: (payload: any) => void) => {
        return observer.subscribe(eventName, callback);
      },
    };
  };
}
