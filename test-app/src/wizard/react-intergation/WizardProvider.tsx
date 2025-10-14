import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { IWizardProviderHOC } from "./types";
import { WizardEvents } from "../types";
import { createEventName } from "../utils";

const WizardContext = createContext<any>(undefined);

const WizardProvider = ({
  children,
  disconnect,
  wizard,
  step,
  client,
  onReset,
  onFinish,
  renderOnFinish,
}: PropsWithChildren<IWizardProviderHOC>) => {
  const [successRender, setSuccessRender] = useState(false);
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);
  useEffect(() => {
    let unsubscribe = () => {};
    if (!onReset) return;
    unsubscribe = client.subscribe(
      createEventName(client.getWizardId(), WizardEvents.ON_RESET),
      () => onReset()
    );
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  });
  useEffect(() => {
    let unsubscribe = () => {};
    if (!onFinish) return;
    unsubscribe = client.subscribe(
      createEventName(client.getWizardId(), WizardEvents.ON_FINISH),
      () =>
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
        wizard,
        step,
        client,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export { WizardProvider, WizardContext };
