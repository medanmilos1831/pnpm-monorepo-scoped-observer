import { useEffect, useRef } from "react";
import type { createStore } from "../Store/createStore";
import { ScrolliumPublicEvents, type ScrolliumProps } from "../types";

const useSetup = (
  store: ReturnType<typeof createStore>,
  props: ScrolliumProps
) => {
  store.createEntity(props);
  const { mount, scroll, addEventListener, stateManager, client } =
    store.getEntity(props.id)!;
  useEffect(mount, []);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    stateManager.mutations.initializeElement(elementRef.current as HTMLElement);
  }, []);

  useEffect(() => {
    let unsubscribe = () => {};
    if (!props.onScroll) return;
    unsubscribe = addEventListener(ScrolliumPublicEvents.ON_SCROLL, () => {
      props.onScroll!(client());
    });
    return () => {
      unsubscribe();
    };
  });
  return { elementRef, scroll, stateManager };
};

export { useSetup };
