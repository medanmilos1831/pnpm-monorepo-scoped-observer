import { createContext, useEffect, type PropsWithChildren } from "react";
import { Client } from "../core";

const WizardContext = createContext<
  | {
      wizard: Client;
    }
  | undefined
>(undefined);

const WizardProvider = ({
  children,
  wizard,
  disconnect,
}: PropsWithChildren<{
  wizard: Client;
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

export { WizardProvider, WizardContext };
