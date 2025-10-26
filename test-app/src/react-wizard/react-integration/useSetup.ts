import { useEffect, useState } from "react";
import { WizardEvents, type IWizardConfig } from "../types";
import type { createStore } from "../Store/createStore";

const useSetup = (
  store: ReturnType<typeof createStore>,
  props: IWizardConfig
) => {
  const wizard = store.createEntity(props);
  useEffect(wizard.mount, []);
  useEffect(() => {
    let unsubscribe = () => {};
    if (!props.onFinish) return;
    unsubscribe = wizard.addEventListener("onFinish", (params: any) => {
      console.log("on finish", params);
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
