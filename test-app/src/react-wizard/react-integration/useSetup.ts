import { useEffect, useState } from "react";
import { WizardEvents, type IWizardConfig } from "../types";
import type { createStore } from "../Store/createStore";

const useSetup = (
  store: ReturnType<typeof createStore>,
  props: IWizardConfig
) => {
  const [successRender, setSuccessRender] = useState(false);

  const wizard = store.createEntity(props);
  useEffect(wizard.mount, []);
  useEffect(() => {
    let unsubscribe = () => {};
    if (!props.onFinish) return;
    unsubscribe = wizard.addEventListener(WizardEvents.ON_FINISH, () => {
      setSuccessRender(true);
    });
    return () => {
      if (!props.onFinish) return;
      unsubscribe();
    };
  });
  useEffect(() => {
    let unsubscribe = () => {};
    if (!props.onReset) return;
    unsubscribe = wizard.addEventListener(WizardEvents.ON_RESET, () => {
      setSuccessRender(false);
      wizard.mutations.reset();
    });
    return () => {
      if (!props.onReset) return;
      unsubscribe();
    };
  });
  return {
    successRender,
    setSuccessRender,
    wizard,
  };
};

export { useSetup };
