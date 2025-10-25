import { WizardStoreEvents, type IWizardConfig } from "../types";

import type { createObserver } from "../observer";

export function mountFn(
  entitiesMap: Map<string, any>,
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
