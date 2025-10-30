import { useEffect, useRef } from "react";
import type { ScrolliumAxis, ScrolliumProps } from "../types";
import type { createStore } from "../Store/createStore";

const useSetup = (
  store: ReturnType<typeof createStore>,
  props: ScrolliumProps
) => {
  store.createEntity(props);
  const { stateManager, mount, scroll } = store.getEntity(props.id)!;
  useEffect(mount, []);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    stateManager.mutations.initializeElement(elementRef.current as HTMLElement);
  }, []);
  useEffect(() => {
    stateManager.mutations.setAxis(props.axis as ScrolliumAxis);
  }, [props.axis]);
  return { elementRef, scroll, stateManager };
};

export { useSetup };
