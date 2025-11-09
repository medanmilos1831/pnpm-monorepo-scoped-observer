import { useSyncExternalStore } from "react";

import { type VisibilityProps } from "../types";
import { visibilityContext } from "../client/context";

const useVisibilty = (props: VisibilityProps) => {
  const context = visibilityContext.getContextById(props.id);
  context.entity.getters;
  useSyncExternalStore(
    context.listeners.onChange,
    context.entity.getters.getVisibility
  );
  return context.entity.getters.getVisibility();
};

export { useVisibilty };
