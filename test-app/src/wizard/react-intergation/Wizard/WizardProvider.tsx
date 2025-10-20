import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { Step } from "./WizardStep";
import type { IWizardConfig } from "../../Store/Entity";
import { WizardEvents } from "../../Store/Entity/types";
import { WizardClientContext } from "../WizardClientProvider";

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
  const [created, _] = useState(() => {
    return context.createEntity(props);
  });
  const store = useContext(WizardClientContext)!;
  const client = store.getClient(props.id);

  const [successRender, setSuccessRender] = useState(false);
  useEffect(created, []);

  useEffect(() => {
    let unsubscribe = () => {};
    if (!onReset) return;
    unsubscribe = client.subscribe(WizardEvents.ON_RESET, onReset);
    return () => {
      unsubscribe();
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
      unsubscribe();
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
