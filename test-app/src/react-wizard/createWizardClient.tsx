import { createContext, type PropsWithChildren } from "react";

import { useRequiredContext } from "./react-integration/useRequiredContext";
import { useSetupWizard } from "./react-integration/useSetupWizard";
import { useWizard } from "./react-integration/useWizard";
import { useWizardClient } from "./react-integration/useWizardClient";
import { createStore } from "./Store/createStore";
import { wizardCommands, type IWizardConfig, type IWizardStep } from "./types";

const createWizardClient = () => {
  const WizardContext = createContext<{ id: string } | undefined>(undefined);
  const store = createStore();
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
      const entity = store.getEntity(id);
      entity.navigation.setStepMiddleware(props);

      return <>{children}</>;
    },
    useWizardCommands: () => {
      const { id } = useRequiredContext(WizardContext);
      const item = store.getEntity(id).mutations;
      const navigation = store.getEntity(id).navigation;
      return {
        reset: () => item.reset(),
        next: (payload?: any) =>
          navigation.navigate({ command: wizardCommands.NEXT, payload }),
        previous: (payload?: any) =>
          navigation.navigate({ command: wizardCommands.PREVIOUS, payload }),
        goToStep: (stepName: string, payload?: any) =>
          navigation.navigate({
            command: wizardCommands.GO_TO_STEP,
            stepName,
            payload,
          }),
        updateSteps: item.updateSteps,
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
