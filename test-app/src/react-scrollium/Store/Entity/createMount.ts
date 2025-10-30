import {
  ScrolliumStoreEvents,
  type ScrolliumProps,
  type IEntity,
} from "../../types";
import type { createObserver } from "../../observer";
export function createMount(
  entitiesMap: Map<string, IEntity>,
  props: ScrolliumProps,
  observer: ReturnType<typeof createObserver>
) {
  const event = () => {
    observer.dispatch(`${ScrolliumStoreEvents.CREATE_SCROLLIUM}-${props.id}`, {
      id: props.id,
    });
  };
  return () => {
    event();
    return () => {
      const entity = entitiesMap.get(props.id);
      if (entity) {
        entity.stateManager.mutations.cleanup();
      }
      entitiesMap.delete(props.id);
      event();
    };
  };
}
