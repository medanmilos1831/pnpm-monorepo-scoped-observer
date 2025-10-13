import { createContext, useEffect, type PropsWithChildren } from "react";
import type { IWizardProviderHOC } from "./types";

const WizardContext = createContext<any>(undefined);

const WizardProviderHOC = ({
  children,
  id,
  disconnect,
  client,
}: PropsWithChildren<IWizardProviderHOC>) => {
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);
  return (
    <WizardContext.Provider
      value={{
        id,
        client,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export { WizardProviderHOC, WizardContext };
