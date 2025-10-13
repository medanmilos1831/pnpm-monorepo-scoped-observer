import type { Observer } from "../Observer";
import { WizardCommands, WizardEvents } from "../types";
import type { Wizard } from "../Wizard";

export function createClient(observer: Observer) {
  return (wizard: Wizard) => {
    return {
      next: () => {
        const step = wizard.findStep({ command: WizardCommands.NEXT });
        observer.dispatch(WizardEvents.ON_NEXT, step);
      },
      previous: () => {
        const step = wizard.findStep({ command: WizardCommands.PREVIOUS });
        observer.dispatch(WizardEvents.ON_PREVIOUS, step);
      },
    };
  };
}
