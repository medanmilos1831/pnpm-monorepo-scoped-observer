import { createContext, useContext } from "react";
import type { createBrowserWizard } from "./createBrowserWizard";

const WizardClientContext = createContext<
  ReturnType<typeof createBrowserWizard> | undefined
>(undefined);

const WizardClientProvider = ({
  children,
  client,
}: {
  children: React.ReactNode;
  client: ReturnType<typeof createBrowserWizard>;
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
  return context;
};

export { WizardClientProvider, WizardClientContext, useWizardClient };
