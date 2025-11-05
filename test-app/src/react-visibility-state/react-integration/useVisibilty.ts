import { useSyncExternalStore } from "react";

import { frameworkApi } from "../framework/frameworkApi";
import { type VisibilityProps } from "../types";

const useVisibilty = (props: VisibilityProps) => {
  const entity = frameworkApi.createEntityApiClient(props);

  useSyncExternalStore(
    entity.watchVisibilityChange.subscribe,
    entity.watchVisibilityChange.snapshot
  );
  return entity.watchVisibilityChange.getValue();
};

export { useVisibilty };
