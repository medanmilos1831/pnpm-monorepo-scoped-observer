import { useSyncExternalStore } from "react";

import { type VisibilityProps } from "../types";
import { visibilityContext } from "../client/context";

const useVisibilty = (props: VisibilityProps) => {
  const entity = visibilityContext.getEntityById(props.id);
  useSyncExternalStore(
    entity.listeners.onChange.subscriber,
    entity.listeners.onChange.snapshot
  );
  return entity.stateManager.getters.getVisibility();
};

export { useVisibilty };
