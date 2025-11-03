import { createContext, type PropsWithChildren } from "react";

import { useRequiredContext } from "./react-integration/useRequiredContext";
import { useSetupWizard } from "./react-integration/useSetupWizard";
import { useWizard } from "./react-integration/useWizard";

import { createStore } from "./Store/createStore";
import {
  WIZARD_STORE_SCOPE,
  type IEntity,
  type IWizardConfig,
  type IWizardStep,
} from "./types";
import { useWizardSelector } from "./react-integration/useWizardSelector";
import { createObserver } from "./core/observer";
import { createModuleInstance } from "./core/createModuleInstance";

const createWizardClient = () => {
  const WizardContext = createContext<{ id: string } | undefined>(undefined);

  const store = createStore<IEntity>();
  const observer = createObserver(WIZARD_STORE_SCOPE);
  return {
    Wizard: ({ children, ...props }: PropsWithChildren<IWizardConfig>) => {
      useSetupWizard(store, props);
      return (
        <WizardContext.Provider value={{ id: props.id }}>
          {children}
        </WizardContext.Provider>
      );
    },
    Step: ({ children, ...props }: PropsWithChildren<IWizardStep>) => {
      const { id } = useRequiredContext(WizardContext);
      const entity = store.getters.getEntityById(id)!.api.getMutations();
      entity.setStepMiddleware(props);

      return <>{children}</>;
    },
    useWizardCommands: () => {
      const { id } = useRequiredContext(WizardContext);
      return store.getters.getEntityById(id).api.getCommands();
    },
    useWizard: () => {
      const { id } = useRequiredContext(WizardContext);
      return useWizard(store, id);
    },
    useWizardSelector: (id: string) => {
      return useWizardSelector(
        {
          store,
          observer,
        },
        id
      );
    },
    getWizardClient: (id: string) => {
      return store.getters.getEntityById(id).api.getClientEntity();
    },
  };
};

export { createWizardClient };
