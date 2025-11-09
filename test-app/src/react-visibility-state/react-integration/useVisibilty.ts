import { useSyncExternalStore } from "react";

import { type VisibilityProps } from "../types";
import { visibilityContext } from "../client/context";

const useVisibilty = (props: VisibilityProps) => {
  const entity = visibilityContext.getEntityById(props.id);
  useSyncExternalStore(
    entity.listeners.onChange,
    entity.stateManager.getters.getVisibility
  );
  return entity.stateManager.getters.getVisibility();
};

export { useVisibilty };
