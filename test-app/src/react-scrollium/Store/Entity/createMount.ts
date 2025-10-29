import { ScrolliumStoreEvents, type ScrolliumProps } from "../../types";
import type { createObserver } from "../../observer";
export function createMount(
  entitiesMap: Map<string, any>,
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
      entitiesMap.delete(props.id);
      event();
    };
  };
}
