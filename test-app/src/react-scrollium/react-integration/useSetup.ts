import { useEffect, useRef } from "react";
import {
  ScrolliumPublicEvents,
  type ScrolliumProps,
  type StoreReturnType,
} from "../types";
import { createEntityApiClient } from "../Store/Entity/createEntityApiClient";

const useSetup = (store: StoreReturnType, props: ScrolliumProps) => {
  store.mutations.createEntity(props, () => createEntityApiClient(props));
  const addEventListener = store.getters.getEntityById(props.id)!.api
    .addEventListener;
  const mutations = store.getters.getEntityById(props.id)!.api.getMutations();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mutations.initializeElement(elementRef.current as HTMLElement);
  }, []);

  useEffect(() => {
    let unsubscribe = () => {};
    if (!props.onScroll) return;
    unsubscribe = addEventListener(ScrolliumPublicEvents.ON_SCROLL, () => {
      props.onScroll!(store.getters.getEntityById(props.id)!.api.getClient());
    });
    return () => {
      unsubscribe();
    };
  });
  return { elementRef };
};

export { useSetup };
