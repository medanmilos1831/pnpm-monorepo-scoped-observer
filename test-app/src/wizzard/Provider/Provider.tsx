import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { createBrowserWizzard } from "../createBrowserWizzard";
import type { IWizzardConfig } from "../types";
import type { createWizzard } from "../createWizzard";

const WizzardContext = createContext<any>(undefined);

const Context = createContext<
  ReturnType<typeof createBrowserWizzard> | undefined
>(undefined);
const Provider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ReturnType<typeof createBrowserWizzard>;
}) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const Wizzard = ({
  children,
  config,
}: PropsWithChildren<{ config: IWizzardConfig }>) => {
  const context = useWizzardClient()!;

  const [{ disconnect, subscribe, getActiveStep, getVisibleSteps }] = useState(
    context.createWizzard(config)
  );
  useEffect(disconnect, []);
  return (
    <WizzardContext.Provider
      value={{
        subscribe,
        getVisibleSteps,
        getActiveStep,
      }}
    >
      {children}
    </WizzardContext.Provider>
  );
};

Wizzard.Navigation = ({
  children,
}: {
  children: (props: any) => React.ReactNode;
}) => {
  const wizzard = useContext(WizzardContext)!;
  return children({
    visibleSteps: Object.values(wizzard.getVisibleSteps()),
    activeStep: wizzard.getActiveStep(),
  });
};

Wizzard.Body = ({
  children,
}: {
  children: (props: any) => React.ReactNode;
}) => {
  const wizzard = useContext(WizzardContext)!;
  return children({
    section: "bodySection",
  });
};

Wizzard.Controls = ({
  children,
}: {
  children: (props: any) => React.ReactNode;
}) => {
  const wizzard = useContext(WizzardContext)!;
  return children({
    section: "controlsSection",
  });
};

const useWizzardClient = () => {
  const context = useContext(Context)!;
  if (!context) {
    throw new Error("useWizzardClient must be used within a Provider");
  }
  return context;
};

export { Provider, useWizzardClient, Wizzard };
