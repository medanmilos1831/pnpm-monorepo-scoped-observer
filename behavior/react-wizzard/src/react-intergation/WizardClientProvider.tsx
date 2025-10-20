import { createContext, useContext } from "react";
import type { createWizardClient } from "../createWizardClient";

const WizardClientContext = createContext<
  ReturnType<typeof createWizardClient> | undefined
>(undefined);

const WizardClientProvider = ({
  children,
  client,
}: {
  children: React.ReactNode;
  client: ReturnType<typeof createWizardClient>;
}) => {
  return (
    <WizardClientContext.Provider value={client}>
      {children}
    </WizardClientContext.Provider>
  );
};

export { WizardClientProvider, WizardClientContext };
