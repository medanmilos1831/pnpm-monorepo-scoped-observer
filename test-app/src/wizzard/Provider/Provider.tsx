import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
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
  name,
}: PropsWithChildren<{ config: IWizzardConfig; name: string }>) => {
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
        setCompleted: (value: boolean) => {
          context.setCompleted(name, value);
        },
        nextStep: () => {
          context.nextStep(name);
        },
        prevStep: () => {
          context.prevStep(name);
        },
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
  const isCompleted = useSyncExternalStore(wizzard.subscribe, () => {
    return wizzard.getActiveStep().isCompleted;
  });
  return children({
    visibleSteps: Object.values(wizzard.getVisibleSteps()),
    activeStep: wizzard.getActiveStep(),
    setCompleted: wizzard.setCompleted,
    isCompleted,
  });
};

Wizzard.Body = ({
  children,
}: {
  children: (props: any) => React.ReactNode;
}) => {
  const step = useStep()!;
  return children(step);
};

Wizzard.Controls = ({
  children,
}: {
  children: (props: any) => React.ReactNode;
}) => {
  const wizzard = useContext(WizzardContext)!;
  return children({
    section: "controlsSection",
    nextStep: () => {
      wizzard.nextStep();
    },
    prevStep: () => {
      wizzard.prevStep();
    },
    stepCompleted: wizzard.getActiveStep().isCompleted,
  });
};

const useStep = () => {
  const context = useContext(WizzardContext);
  const name = useSyncExternalStore(context.subscribe, () => {
    return context.getActiveStep().name;
  });
  return {
    section: "bodySection",
    activeStep: context.getActiveStep(),
    setCompleted: (value: boolean) => context.setCompleted(value),
    name,
  };
};

const useControls = () => {
  const context = useContext(WizzardContext);
  const isCompleted = useSyncExternalStore(context.subscribe, () => {
    return context.getActiveStep().isCompleted;
  });
  return {
    isCompleted,
    nextStep: () => {
      console.log("nextStep");
    },
    prevStep: () => {
      console.log("prevStep");
    },
  };
};

const useWizzardClient = () => {
  const context = useContext(Context)!;
  if (!context) {
    throw new Error("useWizzardClient must be used within a Provider");
  }
  return context;
};

export { Provider, useWizzardClient, Wizzard, useStep };
