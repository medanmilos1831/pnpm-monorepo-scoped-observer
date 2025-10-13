import type { Hub } from "../Hub/Hub";
import type { Observer } from "../Observer";
import { WizardCommands, WizardEvents } from "../types";

export function createClient(hub: Hub, observer: Observer) {
  return (id: string) => {
    const entity = hub.getEntity(id)!;
    return {
      next: () => {
        const step = entity.findStep({ command: WizardCommands.NEXT });
        observer.dispatch(WizardEvents.ON_NEXT, step);
      },
      previous: () => {
        const step = entity.findStep({ command: WizardCommands.PREVIOUS });
        observer.dispatch(WizardEvents.ON_PREVIOUS, step);
      },
    };
  };
}
