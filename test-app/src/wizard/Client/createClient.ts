import type { Observer } from "../Observer";
import { IWizardInternalEvents, WizardCommands, WizardEvents } from "../types";
import type { Step, Wizard } from "../Wizard";

export function createClient(observer: Observer) {
  return ({ wizard, step }: { wizard: Wizard; step: Step }) => {
    return {
      next: (obj?: { actionType: string }) => {
        const result = wizard.findStep({ command: WizardCommands.NEXT });
        if (step.hasValidation) {
          observer.dispatch(IWizardInternalEvents.ON_VALIDATE, {
            command: WizardCommands.NEXT,
            activeStep: wizard.activeStep,
            toStep: result,
            resolve: () => {
              observer.dispatch(WizardEvents.ON_NEXT, {
                activeStep: wizard.activeStep,
                toStep: result,
              });
            },
            ...obj,
          });
          return;
        }
      },
      previous: () => {
        const result = wizard.findStep({ command: WizardCommands.PREVIOUS });
        observer.dispatch(WizardEvents.ON_PREVIOUS, result);
      },
      subscribe: observer.subscribe,
    };
  };
}
