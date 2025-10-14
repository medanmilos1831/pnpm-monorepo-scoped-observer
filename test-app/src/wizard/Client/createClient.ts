import type { Observer } from "../Observer";
import { IWizardInternalEvents, WizardCommands, WizardEvents } from "../types";
import type { Step, Wizard } from "../Wizard";

export function createClient(observer: Observer) {
  return ({ wizard, step }: { wizard: Wizard; step: Step }) => {
    function resolve(
      step: string,
      command: WizardCommands.NEXT | WizardCommands.PREVIOUS
    ) {
      observer.dispatch(command, {
        activeStep: wizard.activeStep,
        toStep: step,
      });
      wizard.changeStep(step);
    }
    return {
      next: (obj?: { actionType: string }) => {
        const result = wizard.findStep({ command: WizardCommands.NEXT });
        if (!result) return;
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
      previous: (obj?: { actionType: string }) => {
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
      subscribe: observer.subscribe,
    };
  };
}
