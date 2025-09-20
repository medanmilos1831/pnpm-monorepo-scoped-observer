import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import type { createWizzard } from "./createWizzard";
import type { IStep } from "./types";

const Context = createContext<ReturnType<typeof createWizzard> | undefined>(
  undefined
);
const Provider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ReturnType<typeof createWizzard>;
}) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useStep = () => {
  const context = useContext(Context)!;
  const step = useSyncExternalStore(
    context.activeStepSyncStore.subscribe,
    context.activeStepSyncStore.getSnapshot
  );
  return { step };
};

const useStepParams = () => {
  const context = useContext(Context)!;
  // const params = useSyncExternalStore(
  //   context.subscribeToStepUpdate,
  //   context.getCurrentStepData
  // );
  return {};
};

const useMutateStep = () => {
  const context = useContext(Context)!;
  // return context.mutateStep;
  return {};
};

const useWizzardNavigate = () => {
  const context = useContext(Context)!;
  return {
    nextStep: () => context.navigationCommand("next"),
    prevStep: () => context.navigationCommand("prev"),
  };
};

const useLogging = () => {
  const context = useContext(Context)!;
};

export {
  Provider,
  useStep,
  useWizzardNavigate,
  useMutateStep,
  useStepParams,
  useLogging,
};
