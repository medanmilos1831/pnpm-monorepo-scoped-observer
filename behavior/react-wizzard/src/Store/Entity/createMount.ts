import {
  WizardStoreEvents,
  type IEntity,
  type IWizardConfig,
} from "../../types";
import type { createObserver } from "../../observer";

export function createMount(
  entitiesMap: Map<string, IEntity>,
  props: IWizardConfig,
  observer: ReturnType<typeof createObserver>
) {
  const event = () => {
    observer.dispatch(`${WizardStoreEvents.CREATE_WIZARD}-${props.id}`, {
      id: props.id,
    });
  };
  return () => {
    event();
    return () => {
      entitiesMap.delete(props.id);
      event();
    };
  };
}
