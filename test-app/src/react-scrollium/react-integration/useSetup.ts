import { useEffect, useRef } from "react";
import type { createStore } from "../Store/createStore";
import {
  ScrolliumPublicEvents,
  type IEntity,
  type ScrolliumProps,
} from "../types";
import type { createStoreNew } from "../Store/createStoreNew";
import { createEntity } from "../Store/Entity/createEntity";

const useSetup = (
  // store: ReturnType<typeof createStore>,
  storeNew: ReturnType<typeof createStoreNew<IEntity>>,
  props: ScrolliumProps
) => {
  storeNew.mutations.createEntity(props, createEntity(props));
  // store.createEntity(props);
  const { modules, stateManager } = storeNew.getters.getEntityById(props.id)!;
  // useEffect(mount, []);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    stateManager.mutations.initializeElement(elementRef.current as HTMLElement);
  }, []);

  useEffect(() => {
    let unsubscribe = () => {};
    if (!props.onScroll) return;
    unsubscribe = modules.addEventListener(
      ScrolliumPublicEvents.ON_SCROLL,
      () => {
        props.onScroll!(modules.clientApi().client);
      }
    );
    return () => {
      unsubscribe();
    };
  });
  return { elementRef, stateManager, modules };
};

export { useSetup };
