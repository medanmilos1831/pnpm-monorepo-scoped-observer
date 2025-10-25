import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import { Store } from "./Store/Store";
import { type IWizardConfig, type IWizardStep } from "./types";
import { useWizard } from "./react-integration/useWizard";
import { useWizardClient } from "./react-integration/useWizardClient";

const createWizardClient = () => {
  const WizardContext = createContext<{ id: string } | undefined>(undefined);
  const store = new Store();
  return {
    Wizard: ({ children, ...props }: PropsWithChildren<IWizardConfig>) => {
      const [successRender, setSuccessRender] = useState(false);

      const wizard = store.createEntity(props, setSuccessRender);
      useEffect(wizard.wizzardSubscription.onFinishSubscription);
      useEffect(wizard.wizzardSubscription.onResetSubscription);
      useEffect(wizard.lifecycle, []);
      if (successRender) {
        return props.renderOnFinish
          ? props.renderOnFinish({
              reset: () => {
                setSuccessRender(false);
                wizard.mutations.reset();
              },
            })
          : null;
      }
      return (
        <WizardContext.Provider value={{ id: props.id }}>
          {children}
        </WizardContext.Provider>
      );
    },
    Step: ({ children, ...props }: PropsWithChildren<IWizardStep>) => {
      const context = useContext(WizardContext)!;
      if (!context) {
        throw new Error("WizardContext not found");
      }
      const client = store.getClient(context.id);
      return <>{children}</>;
    },
    useWizardCommands: () => {
      const context = useContext(WizardContext)!;
      if (!context) {
        throw new Error("WizardContext not found");
      }
      const item = store.getEntity(context.id).mutations;
      return {
        next: item.next,
        previous: item.previous,
        reset: () => item.reset(),
        goToStep: item.goToStep,
      };
    },
    useWizard: () => {
      const context = useContext(WizardContext);
      if (!context) {
        throw new Error("WizardContext not found");
      }
      const { id } = context;
      return useWizard(store, id);
    },
    useWizardClient: (id: string) => {
      return useWizardClient(store, id);
    },
  };
};

export { createWizardClient };
