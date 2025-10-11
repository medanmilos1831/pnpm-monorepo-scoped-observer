import { createContext, useEffect, type PropsWithChildren } from "react";
import { Client } from "../core";
import { Observer } from "../Observer";

const WizardContext = createContext<
  | {
      client: Client;
      eventNameBuilder: (eventName: string) => string;
      observer: Observer;
    }
  | undefined
>(undefined);

const WizardProvider = ({
  children,
  client,
  disconnect,
  eventNameBuilder,
  observer,
}: PropsWithChildren<{
  client: Client;
  disconnect: () => void;
  eventNameBuilder: (eventName: string) => string;
  observer: Observer;
}>) => {
  useEffect(() => {
    return disconnect;
  }, []);
  return (
    <WizardContext.Provider
      value={{
        client,
        eventNameBuilder,
        observer,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export { WizardProvider, WizardContext };
