import { createContext, useEffect, type PropsWithChildren } from "react";
import { Client } from "../core";
import { Observer } from "../Observer";

const WizardContext = createContext<
  | {
      wizard: Client;
      eventNameBuilder: (eventName: string) => string;
      observer: Observer;
    }
  | undefined
>(undefined);

const WizardProvider = ({
  children,
  wizard,
  disconnect,
  eventNameBuilder,
  observer,
}: PropsWithChildren<{
  wizard: Client;
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
        wizard,
        eventNameBuilder,
        observer,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export { WizardProvider, WizardContext };
