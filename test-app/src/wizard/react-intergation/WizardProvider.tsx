import { createContext, useEffect, type PropsWithChildren } from "react";
import type { IWizardProviderHOC } from "./types";
import { WizardEvents } from "../types";

const WizardContext = createContext<any>(undefined);

const WizardProvider = ({
  children,
  disconnect,
  wizard,
  step,
  client,
  onReset,
  onFinish,
}: PropsWithChildren<IWizardProviderHOC>) => {
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);
  useEffect(() => {
    let unsubscribe = () => {};
    if (!onReset) return;
    unsubscribe = client.subscribe(WizardEvents.ON_RESET, () => onReset());
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
      })
    );
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  });
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
