import { useEffect, useRef } from "react";
import {
  ScrolliumPublicEvents,
  type IEntity,
  type ScrolliumProps,
} from "../types";
import { createEntity } from "../Store/Entity/createEntity";
import type { createStore } from "../Store/createStore";

const useSetup = (
  store: ReturnType<typeof createStore<IEntity>>,
  props: ScrolliumProps
) => {
  store.mutations.createEntity(props, createEntity(props));
  const { modules, stateManager } = store.getters.getEntityById(props.id)!;
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
