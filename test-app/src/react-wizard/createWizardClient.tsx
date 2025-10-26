import { createContext, useEffect, type PropsWithChildren } from "react";

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
      useSetup(store, props);
      return (
        <WizardContext.Provider value={{ id: props.id }}>
          {children}
        </WizardContext.Provider>
      );
    },
    Step: ({ children, ...props }: PropsWithChildren<IWizardStep>) => {
      const { id } = useRequiredContext(WizardContext);
      console.log("Step", props);
      console.log("entity", store.getEntity(id));
      useEffect(() => {
        const unsubscribe = store
          .getEntity(id)
          .addEventListener("onNext", (params) => {
            props.onNext?.(params);
          });
        return () => {
          unsubscribe();
        };
      });

      useEffect(() => {
        const unsubscribe = store
          .getEntity(id)
          .addEventListener("onPrevious", (params) => {
            props.onPrevious?.(params);
          });
        return () => {
          unsubscribe();
        };
      });

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
        navigate: item.navigate,
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
