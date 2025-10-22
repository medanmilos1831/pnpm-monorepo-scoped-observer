import { useEffect, useRef } from "react";
import type { Store } from "../Store/Store";
import type { ScrolliumAxis, ScrolliumProps } from "../types";

const useSetup = (store: Store, props: ScrolliumProps) => {
  store.createEntity(props);
  const { mutations, onCreate, remove, onScroll, style } = store.getEntity(
    props.id
  )!;
  useEffect(() => {
    onCreate();
    return () => {
      remove();
    };
  }, []);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mutations.initializeElement(elementRef.current as HTMLElement);
  }, []);
  useEffect(() => {
    mutations.setAxis(props.axis as ScrolliumAxis);
  }, [props.axis]);
  return { elementRef, onScroll, style };
};

export { useSetup };
