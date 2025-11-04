import { useState, useSyncExternalStore } from "react";
import { frameworkAPI, type framework } from "../framework/framework";
import {
  VisibilityPublicEvents,
  type IEntity,
  type VisibilityProps,
} from "../types";

const useVisibilty = (
  {
    store,
    observer,
  }: {
    store: ReturnType<typeof framework.createStore<IEntity>>;
    observer: ReturnType<typeof framework.createObserver>;
  },
  props: VisibilityProps
) => {
  store.mutations.createEntity({ id: props.id }, () => {
    return frameworkAPI.createEntityApiClient(props);
  });
  const entity = store.getters.getEntityById(props.id);
  const getters = entity.api.getters();
  const getClient = entity.api.getClient();
  const addEventListener = entity.api.addEventListener;
  const [onChange] = useState(() => (notify: () => void) => {
    return addEventListener(VisibilityPublicEvents.ON_VISIBILITY_CHANGE, () => {
      notify();
    });
  });
  useSyncExternalStore(onChange, getters.getVisibility);
  return getClient;
};

export { useVisibilty };
