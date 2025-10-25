import { createContext, type PropsWithChildren } from "react";

import { useRequiredContext } from "./react-integration/useRequiredContext";
import { useSetup } from "./react-integration/useSetup";
import { useWizard } from "./react-integration/useWizard";
import { useWizardClient } from "./react-integration/useWizardClient";
import { createStore } from "./Store/createStore";
import { type IWizardConfig, type IWizardStep } from "./types";

const createWizardClient = () => {
  const WizardContext = createContext<{ id: string } | undefined>(undefined);
  const store = createStore();
  return {
    Wizard: ({ children, ...props }: PropsWithChildren<IWizardConfig>) => {
      const { successRender, setSuccessRender, wizard } = useSetup(
        store,
        props
      );
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
      const { id } = useRequiredContext(WizardContext);
      return <>{children}</>;
    },
    useWizardCommands: () => {
      const { id } = useRequiredContext(WizardContext);
      const item = store.getEntity(id).mutations;
      return {
        next: item.next,
        previous: item.previous,
        reset: () => item.reset(),
        goToStep: item.goToStep,
      };
    },
    useWizard: () => {
      const { id } = useRequiredContext(WizardContext);
      return useWizard(store, id);
    },
    useWizardClient: (id: string) => {
      return useWizardClient(store, id);
    },
  };
};

export { createWizardClient };
