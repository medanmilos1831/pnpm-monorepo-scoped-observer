import { createContext, type PropsWithChildren } from "react";
import type { IWizardProvider } from "../types/wizardProvider.types";

const WizardContext = createContext<any>(undefined);

const WizardProvider = ({
  children,
  id,
}: PropsWithChildren<IWizardProvider>) => {
  return (
    <WizardContext.Provider value={undefined}>
      {children}
    </WizardContext.Provider>
  );
};

export { WizardProvider };
