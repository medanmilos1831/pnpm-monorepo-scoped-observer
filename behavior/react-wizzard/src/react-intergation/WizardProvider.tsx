import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { type IWizardConfig } from "../Store/Entity";
import { WizardEvents } from "../Store/Entity/types";
import {
  useWizardClient,
  WizardClientContext,
} from "./WizardClient/WizardClientProvider";
import { Step } from "./WizardStep";

const WizardContext = createContext<{ id: string } | undefined>(undefined);

const Wizard = ({
  children,
  onReset,
  onFinish,
  renderOnFinish,
  ...props
}: PropsWithChildren<IWizardConfig>) => {
  const context = useContext(WizardClientContext)!;
  if (!context) {
    throw new Error("WizardClientContext not found");
  }
  const [{ disconnect }, _] = useState(() => context.createEntity(props));
  const store = useWizardClient();
  const client = store.getClient(props.id);

  const [successRender, setSuccessRender] = useState(false);
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);
  useEffect(() => {
    let unsubscribe = () => {};
    if (!onReset) return;
    unsubscribe = client.subscribe(WizardEvents.ON_RESET, onReset);
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  });
  useEffect(() => {
    let unsubscribe = () => {};
    if (!onFinish) return;
    unsubscribe = client.subscribe(WizardEvents.ON_FINISH, () =>
      onFinish({
        reset: () => {
          client.reset();
        },
        render: () => {
          setSuccessRender(true);
        },
      })
    );
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  });
  if (successRender) {
    return renderOnFinish
      ? renderOnFinish({
          reset: () => {
            setSuccessRender(false);
            client.reset();
          },
        })
      : null;
  }
  return (
    <WizardContext.Provider
      value={{
        id: props.id,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

Wizard.Step = Step;

export { WizardContext, Wizard };
