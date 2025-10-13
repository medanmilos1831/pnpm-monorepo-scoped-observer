import { createContext, useEffect, type PropsWithChildren } from "react";
import type { IWizardProviderHOC } from "./types";

const WizardContext = createContext<any>(undefined);

const WizardProvider = ({
  children,
  disconnect,
  client,
  stepEntity,
}: PropsWithChildren<IWizardProviderHOC>) => {
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);
  return (
    <WizardContext.Provider
      value={{
        client,
        stepEntity,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export { WizardProvider, WizardContext };
