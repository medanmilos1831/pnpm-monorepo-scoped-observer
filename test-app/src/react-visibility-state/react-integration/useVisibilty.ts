import { useSyncExternalStore } from "react";

import { frameworkApi } from "../framework/frameworkApi";
import { type VisibilityProps } from "../types";

const useVisibilty = (props: VisibilityProps) => {
  frameworkApi.createEntityApiClient(props);
  // let entity = frameworkApi.getEntityApiClientById(props.id);

  // useSyncExternalStore(
  //   entity.watchVisibilityChange.subscribe,
  //   entity.watchVisibilityChange.snapshot
  // );
  // return entity.watchVisibilityChange.getValue();
};

export { useVisibilty };
