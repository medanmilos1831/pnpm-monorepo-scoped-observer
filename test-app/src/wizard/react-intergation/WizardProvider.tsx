import { createContext, useEffect, type PropsWithChildren } from "react";
import { Client } from "../core";

const WizardContext = createContext<
  | {
      wizard: Client;
      eventNameBuilder: (eventName: string) => string;
    }
  | undefined
>(undefined);

const WizardProvider = ({
  children,
  wizard,
  disconnect,
  eventNameBuilder,
}: PropsWithChildren<{
  wizard: Client;
  disconnect: () => void;
  eventNameBuilder: (eventName: string) => string;
}>) => {
  useEffect(() => {
    return disconnect;
  }, []);
  return (
    <WizardContext.Provider
      value={{
        wizard,
        eventNameBuilder,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export { WizardProvider, WizardContext };
