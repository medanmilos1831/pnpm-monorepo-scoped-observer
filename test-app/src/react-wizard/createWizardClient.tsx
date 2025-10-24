import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { useWizard } from "./react-integration/useWizard";
import { Store } from "./Store/Store";
import { type IWizardConfig, type IWizardStep } from "./types";
import { useWizardClient } from "./react-integration/useWizardClient";

const createWizardClient = () => {
  const WizardContext = createContext<{ id: string } | undefined>(undefined);
  const store = new Store();
  return {
    Wizard: ({ children, ...props }: PropsWithChildren<IWizardConfig>) => {
      const [successRender, setSuccessRender] = useState(false);
      store.createEntity(props, setSuccessRender);
      const wizard = store.getEntity(props.id);
      useEffect(wizard.wizzardSubscription.onFinishSubscription);
      useEffect(wizard.wizzardSubscription.onResetSubscription);
      useEffect(wizard.remove, []);
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
      return useWizard(store, WizardContext);
    },
    useWizardClient: (id: string) => {
      return useWizardClient(store, id);
    },
  };
};

export { createWizardClient };
