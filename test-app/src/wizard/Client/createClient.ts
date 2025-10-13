import type { Hub } from "../Hub/Hub";
import type { Observer } from "../Observer";

export function createClient(hub: Hub, observer: Observer) {
  return (id: string) => {
    const entity = hub.getEntity(id)!;
    return {
      onNext: () => {
        console.log("CREATED CLIENT", entity, observer);
      },
      next: () => {},
    };
  };
}
