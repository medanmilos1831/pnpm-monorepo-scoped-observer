import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type PropsWithChildren,
} from "react";
import type { createBrowserWizzard } from "../createBrowserWizzard";
import type { IWizzardConfig } from "../types";

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
  const context = useContext(Context)!;
  const [wizzard] = useState<any>(() => context.createWizzard(config));
  return (
    <WizzardContext.Provider value={wizzard}>
      {children}
    </WizzardContext.Provider>
  );
};

Wizzard.Navigation = ({
  children,
}: {
  children: (props: any) => React.ReactNode;
}) => {
  return children({});
};

Wizzard.Body = ({
  children,
}: {
  children: (props: any) => React.ReactNode;
}) => {
  const wizzard = useContext(WizzardContext)!;
  return children(wizzard.getActiveStep());
};

Wizzard.Controls = ({
  children,
}: {
  children: (props: any) => React.ReactNode;
}) => {
  return children({});
};

const useStepQuery = ({ selector }: { selector: any }) => {
  const wizzard = useContext(WizzardContext)!;

  const state = useSyncExternalStore(
    wizzard.stepSubscribe,
    wizzard.stepSnapshot
  );

  return selector(state);
};

const useStepMutation = ({ mutation }: { mutation: any }) => {
  const wizzard = useContext(WizzardContext)!;
  return {
    mutate: (params: any) => {
      const resut = mutation(params, wizzard.activeStep);
      wizzard.dispatch({
        payload: {
          action: "step-updated",
          data: resut,
        },
      });
    },
  };
};

const useWizzardLogging = () => {
  const wizzard = useContext(WizzardContext)!;
  return () => console.log(wizzard.getActiveStep());
};

export { Provider, Wizzard, useStepQuery, useStepMutation, useWizzardLogging };
