import { useSyncExternalStore } from "react";

import { type VisibilityProps } from "../types";
import { visibilityContext } from "../client/context";

const useVisibilty = (props: VisibilityProps) => {
  const context = visibilityContext.getContextById(props.id);

  const visibility = useSyncExternalStore(
    context.listeners.onChange,
    context.entity.getters.getVisibility
  );
  console.log("visibility", visibility);
  return context.entity.getters.getVisibility();
};

export { useVisibilty };
