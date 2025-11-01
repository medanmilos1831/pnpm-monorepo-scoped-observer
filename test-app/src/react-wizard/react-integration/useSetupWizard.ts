import { useEffect } from "react";
import type { createStore } from "../Store/createStore";
import { WizardPublicEvents, type IEntity, type IWizardConfig } from "../types";
import { createEntity } from "../Store/Entity/createEntity";

const useSetupWizard = (
  store: ReturnType<typeof createStore<IEntity>>,
  props: IWizardConfig
) => {
  store.mutations.createEntity(props, createEntity(props));
  const { modules, stateManager } = store.getters.getEntityById(props.id)!;
  // useEffect(mount, []);
  useEffect(() => {
    let unsubscribe = () => {};
    if (!props.onFinish) return;
    unsubscribe = modules.addEventListener(WizardPublicEvents.ON_FINISH, () => {
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
    unsubscribe = modules.addEventListener(WizardPublicEvents.ON_RESET, () => {
      props.onReset!();
    });
    return () => {
      if (!props.onReset) return;
      unsubscribe();
    };
  });
};

export { useSetupWizard };
