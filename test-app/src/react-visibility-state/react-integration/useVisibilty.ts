import { useSyncExternalStore } from "react";

import { type VisibilityProps } from "../types";

const useVisibilty = (props: VisibilityProps) => {
  // const entity = frameworkApi.getEntityApiClientById(props.id);
  // frameworkApi.createEntityApiClient(props);
  // let entity = frameworkApi.getEntityApiClientById(props.id);
  // useSyncExternalStore(
  //   entity.watchVisibilityChange.subscribe,
  //   entity.watchVisibilityChange.snapshot
  // );
  // return entity.watchVisibilityChange.getValue();
};

export { useVisibilty };
