import type { Observer } from "../Observer";
import { IWizardInternalEvents, WizardCommands, WizardEvents } from "../types";
import type { Step, Wizard } from "../Wizard";

export function createClient(observer: Observer) {
  return ({ wizard, step }: { wizard: Wizard; step: Step }) => {
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
    return {
      next: (obj?: { actionType?: string }) => {
        if (step.middleware) {
          observer.dispatch(IWizardInternalEvents.ON_MIDDLEWARE, {
            updateSteps: (callback: (steps: string[]) => string[]) => {
              const updatedSteps = callback(wizard.steps);
              wizard.steps = [...new Set(updatedSteps)];
            },
          });
        }
        const result = wizard.findStep({ command: WizardCommands.NEXT });
        if (!result) {
          observer.dispatch(WizardEvents.ON_FINISH);
          return;
        }
        if (step.hasValidation) {
          observer.dispatch(IWizardInternalEvents.ON_VALIDATE, {
            command: WizardCommands.NEXT,
            activeStep: wizard.activeStep,
            toStep: result,
            resolve: () => {
              resolve(result, WizardCommands.NEXT);
            },
            ...obj,
          });
          return;
        }
        resolve(result, WizardCommands.NEXT);
      },
      previous: (obj?: {
        actionType?: string;
        middleware?: (params: any) => void;
      }) => {
        if (step.middleware) {
          observer.dispatch(IWizardInternalEvents.ON_MIDDLEWARE, {
            updateSteps: (callback: (steps: string[]) => string[]) => {
              const updatedSteps = callback(wizard.steps);
              wizard.steps = [...new Set(updatedSteps)];
            },
          });
        }
        const result = wizard.findStep({ command: WizardCommands.PREVIOUS });
        if (!result) return;
        if (step.hasValidation) {
          observer.dispatch(IWizardInternalEvents.ON_VALIDATE, {
            command: WizardCommands.PREVIOUS,
            activeStep: wizard.activeStep,
            toStep: result,
            resolve: () => {
              resolve(result, WizardCommands.PREVIOUS);
            },
            ...obj,
          });
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
      subscribe: observer.subscribe,
    };
  };
}
