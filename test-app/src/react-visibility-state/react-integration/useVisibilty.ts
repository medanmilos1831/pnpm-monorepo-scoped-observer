import { useSyncExternalStore } from "react";

import { type VisibilityProps } from "../types";
import { visibilityContext } from "../client/context";

const useVisibilty = (props: VisibilityProps) => {
  const entity = visibilityContext.getEntityById(props.id);
  console.log("entity", entity.actions.setVisibilityAction(123));
  // const entity = frameworkApi.getEntityApiClientById(props.id);
  // frameworkApi.createEntityApiClient(props);
  // let entity = frameworkApi.getEntityApiClientById(props.id);
  // useSyncExternalStore(
  //   entity.watchVisibilityChange.subscribe,
  //   entity.watchVisibilityChange.snapshot
  // );
  // return entity.watchVisibilityChange.getValue();
  return entity.stateManager.getters.getVisibility();
};

export { useVisibilty };
