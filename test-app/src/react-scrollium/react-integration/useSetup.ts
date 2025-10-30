import { useEffect, useRef } from "react";
import type { createStore } from "../Store/createStore";
import type { ScrolliumProps } from "../types";

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
  return { elementRef, scroll, stateManager };
};

export { useSetup };
