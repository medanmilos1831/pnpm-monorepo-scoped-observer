import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { createClient } from "../Entity/Client/createClient";
import { WizardEvents } from "../Entity/types";
import { Step, Wizard, type IWizardConfig } from "../Entity";
import { WizardClientContext } from "./WizardClient/WizardClientProvider";
import { WizardStep } from "./WizardStep";
import type { IEntity } from "../Store/types";

const WizardContext = createContext<IEntity | undefined>(undefined);

const WizardProvider = ({
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
  const [{ disconnect, entity }, _] = useState(() => {
    const item = context.createEntity(props.id, () => {
      const wizard = new Wizard(props);
      const step = new Step();
      const client = createClient({ wizard, step });
      return {
        wizard,
        step,
        client,
      };
    });
    return item;
  });

  const [successRender, setSuccessRender] = useState(false);
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);
  useEffect(() => {
    let unsubscribe = () => {};
    if (!onReset) return;
    unsubscribe = entity.client.subscribe(WizardEvents.ON_RESET, onReset);
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  });
  useEffect(() => {
    let unsubscribe = () => {};
    if (!onFinish) return;
    unsubscribe = entity.client.subscribe(WizardEvents.ON_FINISH, () =>
      onFinish({
        reset: () => {
          entity.client.reset();
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
            entity.client.reset();
          },
        })
      : null;
  }
  return (
    <WizardContext.Provider value={entity}>{children}</WizardContext.Provider>
  );
};

WizardProvider.Step = WizardStep;

export { WizardContext, WizardProvider };
