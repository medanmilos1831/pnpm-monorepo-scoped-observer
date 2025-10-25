import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import { Store } from "./Store/Store";
import { WizardEvents, type IWizardConfig, type IWizardStep } from "./types";
import { useWizard } from "./react-integration/useWizard";
import { useWizardClient } from "./react-integration/useWizardClient";
import { useRequiredContext } from "./react-integration/useRequiredContext";

const createWizardClient = () => {
  const WizardContext = createContext<{ id: string } | undefined>(undefined);
  const store = new Store();
  return {
    Wizard: ({ children, ...props }: PropsWithChildren<IWizardConfig>) => {
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
      const client = store.getClient(id);
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
