import { useState, useSyncExternalStore } from "react";
import type { createStore } from "../Store/createStore";
import { createEntityApiClient } from "../Store/Entity/createEntityApiClient";
import { VisibilityPublicEvents, type VisibilityProps } from "../types";

const useVisibilty = (
  store: ReturnType<typeof createStore<any>>,
  props: VisibilityProps
) => {
  store.mutations.createEntity({ id: props.id }, () => {
    return createEntityApiClient(props);
  });
  const entity = store.getters.getEntityById(props.id);
  const getters = entity.api.getters();
  const getClient = entity.api.getClient;
  const addEventListener = entity.api.addEventListener;
  const [onChange] = useState(() => (notify: () => void) => {
    return addEventListener(VisibilityPublicEvents.ON_VISIBILITY_CHANGE, () => {
      notify();
    });
  });
  useSyncExternalStore(onChange, getters.getVisibility);
  return getClient();
};

export { useVisibilty };
