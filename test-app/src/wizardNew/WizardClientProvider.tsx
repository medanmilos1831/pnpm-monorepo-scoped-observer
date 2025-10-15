import { createContext } from "react";
import type { createBrowserWizard } from "./createBrowserWizard";

const WizardClientContext = createContext<any>(undefined);

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

export { WizardClientProvider, WizardClientContext };
