import { useEffect, useRef, useState } from "react";
import type { ScrolliumAxis, ScrolliumProps } from "../types";
import type { Store } from "../Store";

const useSetup = (store: Store, props: ScrolliumProps) => {
  useState(() => {
    return store.createEntity(props);
  });
  const { mutations, getters, onCreate, remove } = store.getEntity(props.id);
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
