import { createContext, useContext } from "react";
import type { createWizardClient } from "./createWizardClient";

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

const useWizardClient = () => {
  const context = useContext(WizardClientContext)!;
  if (!context) {
    throw new Error("WizardClientContext not found");
  }
  console.log("context", context);
  return context;
};

export { WizardClientProvider, WizardClientContext, useWizardClient };
