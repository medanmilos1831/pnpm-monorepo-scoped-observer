import { createContext, useEffect, type PropsWithChildren } from "react";
import { createWizardClient } from "../createWizardClient";

const WizardContext = createContext<
  | {
      wizard: ReturnType<typeof createWizardClient>;
    }
  | undefined
>(undefined);

const Wizard = ({
  children,
  wizard,
  disconnect,
}: PropsWithChildren<{
  wizard: ReturnType<typeof createWizardClient>;
  disconnect: () => void;
}>) => {
  useEffect(() => {
    return disconnect;
  }, []);
  return (
    <WizardContext.Provider
      value={{
        wizard,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export { Wizard, WizardContext };
