import type { Observer } from "./Observer";
import { WizardInternalEvents } from "../types";
import type { WizardModule } from "../WizardModule";

export const onNextMiddleware = (observer: Observer, wizard: WizardModule) => {
  observer.dispatch(WizardInternalEvents.ON_MIDDLEWARE_NEXT, {
    updateSteps: (callback: (steps: string[]) => string[]) => {
      const updatedSteps = callback(wizard.steps);
      wizard.steps = [...new Set(updatedSteps)];
    },
  });
};
export const onPreviousMiddleware = (
  observer: Observer,
  wizard: WizardModule
) => {
  observer.dispatch(WizardInternalEvents.ON_MIDDLEWARE_PREVIOUS, {
    updateSteps: (callback: (steps: string[]) => string[]) => {
      const updatedSteps = callback(wizard.steps);
      wizard.steps = [...new Set(updatedSteps)];
    },
  });
};
