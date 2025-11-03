import { useEffect } from "react";
import { createEntity } from "../Store/Entity/createEntity";
import {
  WizardPublicEvents,
  type IWizardConfig,
  type StoreReturnType,
} from "../types";

const useSetupWizard = (store: StoreReturnType, props: IWizardConfig) => {
  store.mutations.createEntity(props, () => createEntity(props));
  const addEventListener = store.getters
    .getEntityById(props.id)!
    .api.getAddEventListener();
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
