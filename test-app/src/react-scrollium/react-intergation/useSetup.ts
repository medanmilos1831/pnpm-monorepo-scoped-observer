import { useEffect, useRef } from "react";
import type { Store } from "../Store/Store";
import type { ScrolliumAxis, ScrolliumProps } from "../types";

const useSetup = (store: Store, props: ScrolliumProps) => {
  store.createEntity(props);
  const { mutations, getters, onCreate, remove } = store.getEntity(props.id)!;
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
  return { mutations, getters, elementRef };
};

export { useSetup };
