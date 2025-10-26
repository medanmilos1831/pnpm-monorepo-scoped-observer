import { useEffect } from "react";
import type { createStore } from "../Store/createStore";
import { type IWizardConfig } from "../types";

const useSetupWizard = (
  store: ReturnType<typeof createStore>,
  props: IWizardConfig
) => {
  const { mount, addEventListenerWizard: addEventListener } =
    store.createEntity(props);
  useEffect(mount, []);
  useEffect(() => {
    let unsubscribe = () => {};
    if (!props.onFinish) return;
    unsubscribe = addEventListener("onFinish", () => {
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
    unsubscribe = addEventListener("onReset", () => {
      props.onReset!();
    });
    return () => {
      if (!props.onReset) return;
      unsubscribe();
    };
  });
};

export { useSetupWizard };
