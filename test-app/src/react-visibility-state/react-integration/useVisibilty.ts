import { useState, useSyncExternalStore } from "react";
import { frameworkAPI } from "../framework/framework";
import { VisibilityPublicEvents, type VisibilityProps } from "../types";

const useVisibilty = (props: VisibilityProps) => {
  const entity = frameworkAPI.createEntityApiClient(props);
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
