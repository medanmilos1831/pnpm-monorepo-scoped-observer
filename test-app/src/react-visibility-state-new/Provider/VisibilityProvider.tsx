import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import type { createBrowserVisibility } from "../createBrowserVisibility";
import { VISIBILITY_STATE } from "../types";

const VisibilityContext = createContext<
  ReturnType<typeof createBrowserVisibility> | undefined
>(undefined);

const VisibilityProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ReturnType<typeof createBrowserVisibility>;
}) => {
  return (
    <VisibilityContext.Provider value={value}>
      {children}
    </VisibilityContext.Provider>
  );
};

VisibilityProvider.Item = ({
  initState = VISIBILITY_STATE.CLOSE,
  children,
  name,
}: {
  initState?: `${VISIBILITY_STATE}`;
  children: (props: any) => React.ReactNode;
  name: string;
}) => {
  const state = useVisibility(name, initState as VISIBILITY_STATE);
  return <>{children({ state })}</>;
};

const useVisibility = (name: string, initState: VISIBILITY_STATE) => {
  const value = useContext(VisibilityContext)!;
  const [{ disconnect, subscribe, getState }] = useState(() => {
    return value.initializeItem(name, initState as VISIBILITY_STATE);
  });
  useEffect(disconnect, []);
  const state = useSyncExternalStore(subscribe, getState);
  return state;
};

export { VisibilityProvider };
