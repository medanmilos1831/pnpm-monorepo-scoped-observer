import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type PropsWithChildren,
} from "react";
import { useWizard } from "./react-integration/useWizard";
import { useWizardClient } from "./react-integration/useWizardClient";
import { Store } from "./Store/Store";
import {
  WizardEvents,
  WizardStoreEvents,
  type IWizardConfig,
  type IWizardStep,
} from "./types";
import { getWizardData } from "./utils";

const createWizardClient = () => {
  const WizardContext = createContext<{ id: string; wizard: any } | undefined>(
    undefined
  );
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
        <WizardContext.Provider value={{ id: props.id, wizard: wizard }}>
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
      const getters = context.wizard.getters;
      const [subsciber] = useState(() => (notify: () => void) => {
        return getters.subscribe(WizardEvents.ON_STEP_CHANGE, () => {
          notify();
        });
      });
      useSyncExternalStore(subsciber, getters.getActiveStep);
      return getWizardData(getters);
    },
    useWizardClient: (id: string) => {
      const [mount] = useState(() => {
        return (notify: () => void) => {
          return store.subscribe(
            `${WizardStoreEvents.CREATE_WIZARD}-${id}`,
            notify
          );
        };
      });
      const [snapshot] = useState(() => {
        return () => store.entities.has(id);
      });
      useSyncExternalStore(mount, snapshot);
      return store.getEntity(id)?.getters;
    },
  };
};

export { createWizardClient };
