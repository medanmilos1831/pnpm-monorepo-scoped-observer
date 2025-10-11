import { createContext, useEffect, type PropsWithChildren } from "react";
import { Client } from "../core";
import { Observer } from "../Observer";

const WizardContext = createContext<
  | {
      client: Client;
      name: string;
      observer: Observer;
    }
  | undefined
>(undefined);

const WizardProvider = ({
  children,
  client,
  disconnect,
  observer,
  name,
}: PropsWithChildren<{
  client: Client;
  disconnect: () => void;
  observer: Observer;
  name: string;
}>) => {
  useEffect(() => {
    return disconnect;
  }, []);
  return (
    <WizardContext.Provider
      value={{
        client,
        name,
        observer,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export { WizardProvider, WizardContext };
