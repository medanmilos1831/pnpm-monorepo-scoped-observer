import { useEffect } from "react";
import type { createStore } from "../Store/createStore";
import { type IWizardConfig } from "../types";

const useSetup = (
  store: ReturnType<typeof createStore>,
  props: IWizardConfig
) => {
  const wizard = store.createEntity(props);
  useEffect(wizard.mount, []);
  useEffect(() => {
    let unsubscribe = () => {};
    if (!props.onFinish) return;
    unsubscribe = wizard.addEventListener("onFinish", () => {
      props.onFinish!();
    });
    return () => {
      if (!props.onFinish) return;
      unsubscribe();
    };
  });
  useEffect(() => {
    let unsubscribe = () => {};
    if (!props.onReset) return;
    unsubscribe = wizard.addEventListener("onReset", () => {
      props.onReset!();
    });
    return () => {
      if (!props.onReset) return;
      unsubscribe();
    };
  });
  return {
    wizard,
  };
};

export { useSetup };
