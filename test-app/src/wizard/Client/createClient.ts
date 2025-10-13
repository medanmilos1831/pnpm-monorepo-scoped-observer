import type { Observer } from "../Observer";
import { WizardCommands, WizardEvents } from "../types";
import type { Wizard } from "../Wizard";
import type { StepEntity } from "../Wizard";

export function createClient(observer: Observer) {
  return (entity: { wizard: Wizard; stepEntity: StepEntity }) => {
    const { wizard, stepEntity } = entity;
    return {
      next: () => {
        const step = wizard.findStep({ command: WizardCommands.NEXT });
        observer.dispatch(WizardEvents.ON_NEXT, step);
      },
      previous: () => {
        const step = wizard.findStep({ command: WizardCommands.PREVIOUS });
        observer.dispatch(WizardEvents.ON_PREVIOUS, step);
      },
      subscribe: observer.subscribe,
    };
  };
}
