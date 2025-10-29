import { useEffect } from "react";
import type { createStore } from "../Store/createStore";
import { WizardPublicEvents, type IWizardConfig } from "../types";

const useSetupWizard = (
  store: ReturnType<typeof createStore>,
  props: IWizardConfig
) => {
  const { mount, addEventListener } = store.createEntity(props);
  useEffect(mount, []);
  useEffect(() => {
    let unsubscribe = () => {};
    if (!props.onFinish) return;
    unsubscribe = addEventListener(WizardPublicEvents.ON_FINISH, () => {
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
    unsubscribe = addEventListener(WizardPublicEvents.ON_RESET, () => {
      props.onReset!();
    });
    return () => {
      if (!props.onReset) return;
      unsubscribe();
    };
  });
};

export { useSetupWizard };
