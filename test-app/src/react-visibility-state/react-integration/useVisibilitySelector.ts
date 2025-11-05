import { useState, useSyncExternalStore } from "react";
import { VisibilityStoreEvents } from "../types";
import { frameworkApi } from "../framework/frameworkApi";

const useVisibilitySelector = (id: string) => {
  const { subscribe, snapshot, getValue } =
    frameworkApi.getEntityApiClientById(id).onMount;
  // const { store, observer } = frameworkApi.getStoreComposition();
  // const entity = store.getters.getEntityById(id);
  // console.log("selector", entity, store);
  // return store;
  // const observer = frameworkAPI.getStoreObserver();
  // const [mount] = useState(() => {
  //   return (notify: () => void) => {
  //     return observer.subscribe(
  //       `${VisibilityStoreEvents.CREATE_VISIBILITY}-${id}`,
  //       notify
  //     );
  //   };
  // });
  // const [snapshot] = useState(() => {
  //   return () => store.getters.hasEntity(id);
  // });
  useSyncExternalStore(subscribe, snapshot);
  return getValue(id);
  // if (!store.getters.hasEntity(id)) return undefined;
  // return store.getters.getEntityById(id).api.getClientEntity();
};

export { useVisibilitySelector };
